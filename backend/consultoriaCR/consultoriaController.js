const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { enviarNotificacoes } = require('./emailService');

const criarConsultoria = async (req, res, next) => {
  try {
    const { nome, email, telefone, empresa, descricao, consentimento } = req.body;

    const ultimaSolicitacao = await prisma.consultoria.findFirst({
      where: {
        email: email.toLowerCase(),
        criadoEm: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) 
        }
      }
    });

    if (ultimaSolicitacao) {
      return res.status(429).json({
        success: false,
        message: 'Você já enviou uma solicitação recentemente. Aguarde 24 horas para enviar outra.'
      });
    }

    const consultoria = await prisma.consultoria.create({
      data: {
        nome,
        email: email.toLowerCase(),
        telefone,
        empresa,
        descricao,
        consentimento,
        status: 'pendente'
      }
    });


    const resultadoEmails = await enviarNotificacoes(consultoria);
    
    if (!resultadoEmails.cliente.success) {
      console.warn('Falha ao enviar e-mail para cliente:', resultadoEmails.cliente.error);
    }
    if (!resultadoEmails.equipe.success) {
      console.warn('Falha ao enviar notificação para equipe:', resultadoEmails.equipe.error);
    }

    res.status(201).json({
      success: true,
      message: 'Solicitação de consultoria enviada com sucesso!',
      data: {
        id: consultoria.id,
        nome: consultoria.nome,
        email: consultoria.email,
        status: consultoria.status,
        criadoEm: consultoria.criadoEm
      }
    });
  } catch (error) {
    next(error);
  }
};

// Lista todas as consultorias
const listarConsultorias = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, email, empresa } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where = {};
    if (status) where.status = status;
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (empresa) where.empresa = { contains: empresa, mode: 'insensitive' };

    const [consultorias, total] = await Promise.all([
      prisma.consultoria.findMany({
        where,
        skip,
        take,
        orderBy: { criadoEm: 'desc' },
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          empresa: true,
          descricao: true,
          status: true,
          criadoEm: true,
          alteradoEm: true,
          responsavel: true,
          observacoes: true,
          dataAtendimento: true
        }
      }),
      prisma.consultoria.count({ where })
    ]);

    res.status(200).json({
      success: true,
      data: consultorias,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Buscar uma consultoria específica
const buscarConsultoria = async (req, res, next) => {
  try {
    const { id } = req.params;

    const consultoria = await prisma.consultoria.findUnique({
      where: { id }
    });

    if (!consultoria) {
      return res.status(404).json({
        success: false,
        message: 'Consultoria não encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: consultoria
    });
  } catch (error) {
    next(error);
  }
};

// Atualizar status da consultoria
const atualizarStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validar status
    const statusValidos = ['pendente', 'em_analise', 'confirmada', 'concluida', 'cancelada'];
    if (!statusValidos.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status inválido. Use um dos seguintes: ${statusValidos.join(', ')}`
      });
    }

    // Verificar se existe
    const consultoriaExistente = await prisma.consultoria.findUnique({
      where: { id }
    });

    if (!consultoriaExistente) {
      return res.status(404).json({
        success: false,
        message: 'Consultoria não encontrada'
      });
    }

    const consultoria = await prisma.consultoria.update({
      where: { id },
      data: { status }
    });

    res.status(200).json({
      success: true,
      message: 'Status atualizado com sucesso',
      data: consultoria
    });
  } catch (error) {
    next(error);
  }
};

// Adicionar observações ou responsável
const atualizarConsultoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { observacoes, responsavel, dataAtendimento } = req.body;

    // Verificar se existe
    const consultoriaExistente = await prisma.consultoria.findUnique({
      where: { id }
    });

    if (!consultoriaExistente) {
      return res.status(404).json({
        success: false,
        message: 'Consultoria não encontrada'
      });
    }

    const dataUpdate = {};
    if (observacoes !== undefined) dataUpdate.observacoes = observacoes;
    if (responsavel !== undefined) dataUpdate.responsavel = responsavel;
    if (dataAtendimento !== undefined) dataUpdate.dataAtendimento = new Date(dataAtendimento);

    const consultoria = await prisma.consultoria.update({
      where: { id },
      data: dataUpdate
    });

    res.status(200).json({
      success: true,
      message: 'Consultoria atualizada com sucesso',
      data: consultoria
    });
  } catch (error) {
    next(error);
  }
};

const deletarConsultoria = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar se existe
    const consultoriaExistente = await prisma.consultoria.findUnique({
      where: { id }
    });

    if (!consultoriaExistente) {
      return res.status(404).json({
        success: false,
        message: 'Consultoria não encontrada'
      });
    }

    const consultoria = await prisma.consultoria.update({
      where: { id },
      data: { status: 'cancelada' }
    });

    res.status(200).json({
      success: true,
      message: 'Consultoria cancelada com sucesso',
      data: consultoria
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criarConsultoria,
  listarConsultorias,
  buscarConsultoria,
  atualizarStatus,
  atualizarConsultoria,
  deletarConsultoria
};