// --- PARTE 1: CONFIGURAÇÃO INICIAL ---
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');


const prisma = new PrismaClient();
const app = express();
const PORT = 3000;


// --- LINHA DA CORREÇÃO ---
// Esta linha ensina o servidor a ler o JSON enviado pelo Postman.
// Ela deve vir ANTES da definição das rotas.
app.use(express.json());
// -------------------------


// --- PARTE 2: ROTAS DA API ---

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Rota de login finalizada (sua parte)
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }
    
    res.status(200).json({ message: 'Login bem-sucedido!' });

  } catch (error) {
    // Mantemos este console.error para o caso de erros inesperados no servidor
    console.error("ERRO INESPERADO:", error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});


// --- PARTE 3: INÍCIO DO SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});