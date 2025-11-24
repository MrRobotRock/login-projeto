const nodemailer = require('nodemailer');

// Configuração do transporter baseado no provedor de email
const getEmailTransporter = () => {
  const emailService = process.env.EMAIL_SERVICE || "gmail";
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    throw new Error("EMAIL_USER e EMAIL_PASSWORD não configurados no .env");
  }

  // Configurações para diferentes provedores
  const config = {
    gmail: {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPassword.trim()
      }
    },
    outlook: {
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPassword.trim()
      }
    },
    office365: {
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPassword.trim()
      }
    },
    yahoo: {
      host: "smtp.mail.yahoo.com",
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPassword.trim()
      }
    }
  };

  return nodemailer.createTransport(config[emailService] || config.gmail);
};

const templateEmailCliente = (consultoria) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .info-box {
          background: white;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #667eea;
          border-radius: 5px;
        }
        .info-row {
          margin: 10px 0;
        }
        .label {
          font-weight: bold;
          color: #667eea;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 12px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Solicitação Recebida!</h1>
      </div>
      <div class="content">
        <p>Olá <strong>${consultoria.nome}</strong>,</p>
        
        <p>Recebemos sua solicitação de consultoria com sucesso! Nossa equipe irá analisar suas necessidades e entraremos em contato em breve.</p>
        
        <div class="info-box">
          <h3>Detalhes da Solicitação</h3>
          <div class="info-row">
            <span class="label">Protocolo:</span> ${consultoria.id}
          </div>
          <div class="info-row">
            <span class="label">Nome:</span> ${consultoria.nome}
          </div>
          <div class="info-row">
            <span class="label">Email:</span> ${consultoria.email}
          </div>
          <div class="info-row">
            <span class="label">Telefone:</span> ${consultoria.telefone}
          </div>
          <div class="info-row">
            <span class="label">Empresa:</span> ${consultoria.empresa}
          </div>
          <div class="info-row">
            <span class="label">Status:</span> ${consultoria.status}
          </div>
          <div class="info-row">
            <span class="label">Data:</span> ${new Date(consultoria.criadoEm).toLocaleString('pt-BR')}
          </div>
        </div>
        
        <div class="info-box">
          <h3> Sua Mensagem</h3>
          <p>${consultoria.descricao}</p>
        </div>
        
        <p><strong>O que acontece agora?</strong></p>
        <ul>
          <li>Nossa equipe irá analisar sua solicitação</li>
          <li>Entraremos em contato em até 48 horas úteis</li>
          <li>Você receberá atualizações por e-mail</li>
        </ul>
        
        <center>
          <a href="${process.env.FRONTEND_URL}" class="button">Acessar Portal</a>
        </center>
        
        <div class="footer">
          <p>Este é um e-mail automático, por favor não responda.</p>
          <p>Se tiver dúvidas, entre em contato através do nosso site.</p>
          <p>&copy; 2024 - Todos os direitos reservados</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Template de e-mail para a equipe interna
const templateEmailEquipe = (consultoria) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: #ff6b6b;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .alert-box {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .info-box {
          background: white;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #ff6b6b;
          border-radius: 5px;
        }
        .info-row {
          margin: 10px 0;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        .label {
          font-weight: bold;
          color: #ff6b6b;
          display: inline-block;
          width: 120px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #ff6b6b;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Nova Solicitação de Consultoria</h1>
      </div>
      <div class="content">
        <div class="alert-box">
          <strong>Ação Necessária:</strong> Uma nova solicitação de consultoria precisa ser analisada.
        </div>
        
        <div class="info-box">
          <h3>Informações do Cliente</h3>
          <div class="info-row">
            <span class="label">Nome:</span> ${consultoria.nome}
          </div>
          <div class="info-row">
            <span class="label">Email:</span> <a href="mailto:${consultoria.email}">${consultoria.email}</a>
          </div>
          <div class="info-row">
            <span class="label">Telefone:</span> <a href="tel:${consultoria.telefone}">${consultoria.telefone}</a>
          </div>
          <div class="info-row">
            <span class="label">Empresa:</span> ${consultoria.empresa}
          </div>
        </div>
        
        <div class="info-box">
          <h3>Detalhes da Solicitação</h3>
          <div class="info-row">
            <span class="label">Protocolo:</span> ${consultoria.id}
          </div>
          <div class="info-row">
            <span class="label">Status:</span> ${consultoria.status}
          </div>
          <div class="info-row">
            <span class="label">Data:</span> ${new Date(consultoria.criadoEm).toLocaleString('pt-BR')}
          </div>
        </div>
        
        <div class="info-box">
          <h3>Descrição do Cliente</h3>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${consultoria.descricao}</p>
        </div>
        
        <center>
          <a href="${process.env.FRONTEND_URL}/admin/consultorias/${consultoria.id}" class="button">Visualizar no Sistema</a>
        </center>
        
        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          <strong>Próximos Passos:</strong>
        </p>
        <ul style="color: #666;">
          <li>Acesse o sistema para mais detalhes</li>
          <li>Atribua um responsável pela consultoria</li>
          <li>Entre em contato com o cliente em até 48h</li>
        </ul>
      </div>
    </body>
    </html>
  `;
};

// e-mail de confirmação para o cliente
const enviarEmailCliente = async (consultoria) => {
  try {
    const transporter = getEmailTransporter();
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'Equipe de Consultoria'}" <${process.env.EMAIL_USER}>`,
      to: consultoria.email,
      subject: 'Solicitação de Consultoria Recebida',
      html: templateEmailCliente(consultoria),
    });
    console.log(`E-mail enviado para o cliente: ${consultoria.email}`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar e-mail para cliente:', error);
    return { success: false, error: error.message };
  }
};

const enviarEmailEquipe = async (consultoria) => {
  try {
    if (!process.env.EMAIL_ADMIN) {
      console.warn("⚠️ EMAIL_ADMIN não configurado no .env");
      return { success: false, error: "EMAIL_ADMIN não configurado" };
    }

    const transporter = getEmailTransporter();
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'Sistema de Consultorias'}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      subject: `Nova Consultoria - ${consultoria.nome} (${consultoria.empresa})`,
      html: templateEmailEquipe(consultoria),
    });
    console.log(`Notificação enviada para equipe: ${process.env.EMAIL_ADMIN}`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar notificação para equipe:', error);
    return { success: false, error: error.message };
  }
};

const enviarNotificacoes = async (consultoria) => {
  const resultados = await Promise.allSettled([
    enviarEmailCliente(consultoria),
    enviarEmailEquipe(consultoria)
  ]);

  return {
    cliente: resultados[0].status === 'fulfilled' ? resultados[0].value : { success: false, error: resultados[0].reason },
    equipe: resultados[1].status === 'fulfilled' ? resultados[1].value : { success: false, error: resultados[1].reason }
  };
};

module.exports = {
  enviarEmailCliente,
  enviarEmailEquipe,
  enviarNotificacoes,
};