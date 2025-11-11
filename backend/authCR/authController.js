const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "4ca88861388a21375c08e5594ad702b20efd0a31e3d3297f067077c8325e5b50";
//Sistema de registrar uma conta de usuário
exports.register = async (req, res) => {
  const { nome, usuario, email, senha } = req.body;

  try {
    if (!nome || !usuario || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const emailExiste = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExiste) {
      return res.status(409).json({ error: "Este email já está em uso" });
    }

    const usuarioExiste = await prisma.user.findUnique({
      where: { usuario },
    });

    if (usuarioExiste) {
      return res
        .status(409)
        .json({ error: "Este nome de usuário já está em uso" });
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
      message: "Usuário criado com sucesso!",
      token,
      user: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        usuario: novoUsuario.usuario,
        email: novoUsuario.email,
        status: novoUsuario.status,
        roles: [],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao criar o usuário" });
  }
};

//Sistema de logar numa conta de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // --- BUSCA DE USUÁRIO COM ROLES ---
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    if (!user.status) {
      return res
        .status(401)
        .json({
          error: "Usuário inativo. Entre em contato com o administrador.",
        });
    }
    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // --- GERAÇÃO DO TOKEN JWT ---
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        usuario: user.usuario,
      },
      JWT_SECRET,
      { expiresIn: "24h" } // token expira em 24 horas
    );

    return res.status(200).json({
      message: "Login bem-sucedido!",
      token,
      user: {
        id: user.id,
        nome: user.nome,
        usuario: user.usuario,
        email: user.email,
        status: user.status,
        roles: user.userRoles.map((ur) => ({
          id: ur.role.id,
          nome: ur.role.nome,
        })),
      },
    });
  } catch (error) {
    console.error("ERRO NO LOGIN:", error);
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
  // ATENÇÃO: O model é 'user', não 'usuario'
  const usuarioExistente = await prisma.user.findUnique({
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
