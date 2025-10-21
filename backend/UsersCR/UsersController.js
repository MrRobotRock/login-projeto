const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ROTA 1: Listar todos os usuários
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

// ROTA 2: Buscar usuário por ID
exports.getUserID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuário não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};

// ROTA 3: Criar novo usuário
exports.createUser = async (req, res) => {
  try {
    const newUser = await prisma.user.create({ data: req.body });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
};

// ROTA 4: Atualizar usuário
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

// ROTA 5: Deletar usuário
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ mensagem: "User deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
};
