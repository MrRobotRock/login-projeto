const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

//Sistema de registrar uma conta de usuário
exports.register = async (req, res) => {
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
  };

//Sistema de logar numa conta de usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  // Verifique se os dados obrigatórios foram fornecidos
  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  // Verifique se o usuário com o email fornecido existe
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuarioExistente) {
    return res.status(404).json({ error: "Usuário nao encontrado." });
  }

  //
  //Ainda não implementado o sistema de login
  //
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
