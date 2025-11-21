const express = require('express');
const { 
  criarConsultoria, 
  listarConsultorias, 
  buscarConsultoria,
  atualizarStatus,
  atualizarConsultoria,
  deletarConsultoria
} = require('./consultoriaController'); 
const { 
  validateConsultoria, 
  validateQueryParams 
} = require('./validation');

const router = express.Router();

// Rotas públicas
router.post('/', validateConsultoria, criarConsultoria);
router.get('/', validateQueryParams, listarConsultorias);
router.get('/:id', buscarConsultoria);

// Rotas de admin
router.patch('/:id/status', atualizarStatus);
router.patch('/:id', atualizarConsultoria);
router.delete('/:id', deletarConsultoria);

module.exports = router;