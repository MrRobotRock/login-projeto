const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Cria nova solicitação
const criarConsultoria = async (req, res, next) => {
  try {
    const { nome, email, telefone, empresa, descricao, consentimento } = req.body;

    // Verificar se já existe uma solicitação recente do mesmo email
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

    // Criar consultoria
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

    // Construir filtros
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
          responsavel: true
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

module.exports = {
  criarConsultoria,
  listarConsultorias,
  buscarConsultoria
};