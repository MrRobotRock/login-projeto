// --- PARTE 1: CONFIGURAÇÃO INICIAL ---
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt"); // Usando 'bcrypt' que é o correto
const jwt = require("jsonwebtoken");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

// Chave secreta para o JWT
const JWT_SECRET = process.env.JWT_SECRET || "4ca88861388a21375c08e5594ad702b20efd0a31e3d3297f067077c8325e5b50";

app.use(express.json());
app.use(cors());

// --- PARTE 2: ROTAS DA API ---

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// ROTA DO REGISTRO
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

// ROTA DO LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login bem-sucedido!",
      token,
    });
  } catch (error) {
    console.error("ERRO INESPERADO:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});


// =================================================================
// --- SUA NOVA TAREFA (GET) COMEÇA AQUI ---
// =================================================================
// Rota para validar o código de recuperação de senha
app.get('/api/validar-codigo', async (req, res) => {
  try {
    // 1. Receber os dados da URL (Query Params)
    const { email, token } = req.query;

    if (!email || !token) {
      return res.status(400).json({ valido: false, error: 'Email e token são obrigatórios.' });
    }

    // 2. Buscar no banco usando os nomes corretos do schema
    const resetRequest = await prisma.passwordReset.findFirst({
      where: {
        email: email,
        senhaAleatoria: token // Nome correto do schema
      }
    });

    // 3. Verificar se o pedido existe
    if (!resetRequest) {
      return res.json({ valido: false, error: 'Token inválido ou e-mail não encontrado.' });
    }

    // 4. VERIFICAR SE O TOKEN JÁ FOI UTILIZADO
    if (resetRequest.utilizado === true) {
      return res.json({ valido: false, error: 'Este código já foi utilizado.' });
    }

    // 5. Verificar se a data de expiração é válida
    const agora = new Date();
    if (agora > resetRequest.dataExpiracao) { // Nome correto do schema
      return res.json({ valido: false, error: 'Este código expirou.' });
    }

    // 6. SE TUDO ESTIVER CERTO:
    // Marcar o código como 'utilizado'
    await prisma.passwordReset.update({
      where: {
        id: resetRequest.id
      },
      data: {
        utilizado: true
      }
    });

    // 7. Retornar 'true'
    res.json({ valido: true });

  } catch (error) {
    console.error("Erro ao validar token:", error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});
// =================================================================
// --- SUA NOVA TAREFA (GET) TERMINA AQUI ---
// =================================================================


// ROTAS SEPARADAS
const authRoutes = require("./authCR/authRoutes");
app.use("/auth", authRoutes);

const usersRoutes = require("./UsersCR/UsersRoutes");
app.use("/users", usersRoutes);

// --- PARTE 3: INÍCIO DO SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});