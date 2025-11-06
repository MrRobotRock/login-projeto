//4ca88861388a21375c08e5594ad702b20efd0a31e3d3297f067077c8325e5b50
// --- PARTE 1: CONFIGURAÇÃO INICIAL ---
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // <-- novo import
const cors = require("cors");
const prisma = new PrismaClient();
const app = express();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const PORT = 3000;
const prisma = new PrismaClient();
const dotenv = require("dotenv");

// Chave secreta para o JWT (ideal: usar variável de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || "4ca88861388a21375c08e5594ad702b20efd0a31e3d3297f067077c8325e5b50";

app.use(express.json());
app.use(cors());

// --- PARTE 2: ROTAS DA API ---

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// ISSO AQUI É A ROTA DO REGISTRO
app.post('/api/register', async (req, res) => {
  const { nome, usuario, email, senha } = req.body;


  try {
    if (!nome || !usuario || !email || !senha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const emailExiste = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExiste) {
      return res.status(409).json({ error: 'Este email já está em uso' });
    }

    const usuarioExiste = await prisma.user.findUnique({
      where: { usuario },
    });

    if (usuarioExiste) {
      return res.status(409).json({ error: 'Este nome de usuário já está em uso' });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = await prisma.user.create({
      data: {
        nome,
        usuario,
        email,
        senha: senhaHash,
      },
    });

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      userId: novoUsuario.id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao criar o usuário' });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // --- BUSCA DE USUÁRIO ---
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // --- VALIDAÇÃO DE SENHA ---
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // --- GERAÇÃO DO TOKEN JWT ---
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // token expira em 1 horas
    );

    // --- RESPOSTA FINAL ---
    return res.status(200).json({
      message: "Login bem-sucedido!",
      token,
    });
  } catch (error) {
    console.error("ERRO INESPERADO:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});


const authRoutes = require("./authCR/authRoutes");
app.use("/auth", authRoutes);

const usersRoutes = require("./UsersCR/UsersRoutes");
app.use("/users", usersRoutes);

// --- PARTE 3: INÍCIO DO SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});