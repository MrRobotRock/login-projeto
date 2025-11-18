
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Rotas de consultoria
const consultoriaRoutes = require('./consultoriaCR/consultoriaRoutes');
const errorHandler = require('./consultoriaCR/errorHandler');

app.use('/api/consultorias', consultoriaRoutes);

// Middleware de erro
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`API Consultorias: http://localhost:${PORT}/api/consultorias`);
});
