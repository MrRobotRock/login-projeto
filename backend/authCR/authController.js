const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Sistema de registrar uma conta de usuário
exports.register = async (req, res) => {
  const { nome, usuario, email, senha } = req.body;

  // Verificar se os dados obrigatórios foram fornecidos
  if (!nome || !usuario || !email || !senha) {
    return res.status(400).json({
      error:
        "Dados incompletos. Nome, nome de usuário, email e senha são obrigatórios.",
    });
  }

  // Verifique se o usuário com o email fornecido já existe
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    return res.status(409).json({ error: "Este email já está em uso." });
  }

  //
  //Ainda não implementado o sistema de registro
  //
};

//Sistema de logar numa conta de usuário
exports.login = async (req, res) => {
  // const { email, senha } = req.body;

  // // Verifique se os dados obrigatórios foram fornecidos
  // if (!email || !senha) {
  //   return res.status(400).json({ error: "Email e senha são obrigatórios." });
  // }

  // // Verifique se o usuário com o email fornecido existe
  // const usuarioExistente = await prisma.usuario.findUnique({
  //   where: { email },
  // });

  // if (!usuarioExistente) {
  //   return res.status(404).json({ error: "Usuário nao encontrado." });
  // }

  //
  //Ainda não implementado o sistema de login
  //

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
    // const token = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //   },
    //   JWT_SECRET,
    //   { expiresIn: "1h" } // token expira em 1 horas
    // );
    const generateToken = (id, secretKey) => {
      return jwt.sign(
        {
          id: user.id,
          user: user.usuario,
          email: user.email,
          password: user.senha,
          createdAt: user.criadoEm,
        },
        secretKey,
        { expiresIn: "30m" }
      );
    };

    const token = generateToken(user.id, process.env.JWT_SECRET);

    // --- RESPOSTA FINAL ---
    return res.status(200).json({
      message: "Login bem-sucedido!",
      token,
    });
  } catch (error) {
    console.error("ERRO INESPERADO:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

//Sistema de "esqueci minha senha"
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Verifique se o email foi fornecido
  if (!email) {
    return res.status(400).json({ error: "Email obrigatório." });
  }

  // Verifique se o usuário com o email fornecido existe
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuarioExistente) {
    return res.status(404).json({ error: "Usuário nao encontrado." });
  }

  //
  // Ainda não implementado o envio de e-mail para restauração de senha
  //
};

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
