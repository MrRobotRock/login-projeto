const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const router = express.Router();
const prisma = new PrismaClient();

// A rota de registro
router.post('/register', async (req, res) => {
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

module.exports = router;
