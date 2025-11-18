// Middleware de tratamento de erros
const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err);

  // Erro do Prisma
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'Registro duplicado',
      error: 'Já existe um registro com esses dados'
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Registro não encontrado'
    });
  }

  // Erro de validação do Prisma
  if (err.code && err.code.startsWith('P')) {
    return res.status(400).json({
      success: false,
      message: 'Erro no banco de dados',
      error: err.message
    });
  }

  // Erro padrão
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;