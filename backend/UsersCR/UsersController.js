const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Listar todas as roles disponíveis
exports.getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    console.error("Erro ao buscar roles:", error);
    res.status(500).json({ error: "Erro ao buscar roles" });
  }
};

// ROTA 1: Listar todos os usuários
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    const mapped = users.map((u) => ({
      id: u.id,
      nome: u.nome,
      usuario: u.usuario,
      email: u.email,
      status: u.status,
      criadoEm: u.criadoEm,
      alteradoEm: u.alteradoEm,
      roles: (u.userRoles || []).map((ur) => ur.roleId),
    }));

    res.json(mapped);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

// ROTA 2: Buscar usuário por ID
exports.getUserID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { userRoles: { include: { role: true } } },
    });

    if (user) {
      const mapped = {
        id: user.id,
        nome: user.nome,
        usuario: user.usuario,
        email: user.email,
        status: user.status,
        criadoEm: user.criadoEm,
        alteradoEm: user.alteradoEm,
        roles: (user.userRoles || []).map((ur) => ur.roleId),
      };
      res.json(mapped);
    } else {
      res.status(404).json({ error: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};

// ROTA 3: Criar novo usuário
exports.createUser = async (req, res) => {
  try {
    const newUser = await prisma.user.create({ data: req.body });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
};

// ROTA 4: Atualizar usuário
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: req.body,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

// ROTA 5: Deletar usuário
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: id } });
    res.status(200).json({ mensagem: `User ${id} deletado com sucesso` });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
};

// ROTA 6: Listar todas as roles disponíveis
exports.getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    // retornar id e nome
    res.json(roles.map(r => ({ id: r.id, nome: r.nome })));
  } catch (error) {
    console.error('Erro ao buscar roles:', error);
    res.status(500).json({ error: 'Erro ao buscar roles.' });
  }
};
