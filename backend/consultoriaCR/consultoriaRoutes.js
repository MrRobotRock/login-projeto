const express = require('express');
const { 
  criarConsultoria, 
  listarConsultorias, 
  buscarConsultoria 
} = require('./consultoriaController'); 
const { 
  validateConsultoria, 
  validateQueryParams 
} = require('./validation'); 

const router = express.Router();

router.post('/', validateConsultoria, criarConsultoria);
router.get('/', validateQueryParams, listarConsultorias);
router.get('/:id', buscarConsultoria);

module.exports = router;