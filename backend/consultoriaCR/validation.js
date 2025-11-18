const { body, query, validationResult } = require('express-validator');

// Middleware para validar criação de consultoria
const validateConsultoria = [
  body('nome')
    .trim()
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  
  body('telefone')
    .trim()
    .notEmpty().withMessage('Telefone é obrigatório')
    .matches(/^[\d\s\(\)\-\+]+$/).withMessage('Telefone inválido'),
  
  body('empresa')
    .trim()
    .notEmpty().withMessage('Empresa é obrigatória')
    .isLength({ min: 2 }).withMessage('Nome da empresa deve ter pelo menos 2 caracteres'),
  
  body('descricao')
    .trim()
    .notEmpty().withMessage('Descrição é obrigatória')
    .isLength({ min: 10 }).withMessage('Descrição deve ter pelo menos 10 caracteres')
    .isLength({ max: 1000 }).withMessage('Descrição não pode ter mais de 1000 caracteres'),
  
  body('consentimento')
    .isBoolean().withMessage('Consentimento deve ser verdadeiro ou falso')
    .custom(value => value === true).withMessage('É necessário aceitar o consentimento'),

  // Middleware para retornar erros
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: errors.array().map(err => ({
          campo: err.path,
          mensagem: err.msg
        }))
      });
    }
    next();
  }
];

// listagem
const validateQueryParams = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Página deve ser um número positivo'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limite deve ser entre 1 e 100'),
  
  query('status')
    .optional()
    .isIn(['pendente', 'em_analise', 'confirmada', 'concluida', 'cancelada'])
    .withMessage('Status inválido'),

  // Middleware para retornar erros
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: errors.array().map(err => ({
          campo: err.path,
          mensagem: err.msg
        }))
      });
    }
    next();
  }
];

module.exports = {
  validateConsultoria,
  validateQueryParams
};