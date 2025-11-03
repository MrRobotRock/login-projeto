// // --- PARTE 1: CONFIGURAÇÃO INICIAL ---
// const express = require("express");
// // const { PrismaClient } = require("@prisma/client");
// // const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken"); // <-- novo import
// const cors = require("cors");
// const app = express();
// const PORT = 3000;
// const dotenv = require("dotenv");

// // Chave secreta para o JWT (ideal: usar variável de ambiente)
// // const JWT_SECRET = process.env.JWT_SECRET || "chave-super-secreta";

// dotenv.config();
// app.use(express.json());
// app.use(cors());

// // --- PARTE 2: ROTAS DA API ---

// app.get("/", (req, res) => {
//   res.send("Servidor funcionando!");
// });

// const authRoutes = require("./authCR/authRoutes");
// app.use("/auth", authRoutes);

// const usersRoutes = require("./UsersCR/UsersRoutes");
// app.use("/users", usersRoutes);

// // --- PARTE 3: INÍCIO DO SERVIDOR ---
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });

// // app.post("/api/login", async (req, res) => {
// //   try {
// //     const { email, senha } = req.body;

// //     // --- BUSCA DE USUÁRIO ---
// //     const user = await prisma.user.findUnique({
// //       where: { email },
// //     });

// //     if (!user) {
// //       return res.status(404).json({ error: "Usuário não encontrado." });
// //     }

// //     // --- VALIDAÇÃO DE SENHA ---
// //     const senhaCorreta = await bcrypt.compare(senha, user.senha);

// //     if (!senhaCorreta) {
// //       return res.status(401).json({ error: "Senha incorreta." });
// //     }

// //     // --- GERAÇÃO DO TOKEN JWT ---
// //     const token = jwt.sign(
// //       {
// //         id: user.id,
// //         email: user.email,
// //       },
// //       JWT_SECRET,
// //       { expiresIn: "1h" } // token expira em 1 horas
// //     );

// //     // --- RESPOSTA FINAL ---
// //     return res.status(200).json({
// //       message: "Login bem-sucedido!",
// //       token,
// //     });
// //   } catch (error) {
// //     console.error("ERRO INESPERADO:", error);
// //     res.status(500).json({ error: "Erro interno no servidor." });
// //   }
// // });

// --- PARTE 1: CONFIGURAÇÃO INICIAL ---
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // <-- novo import
const cors = require("cors");
const prisma = new PrismaClient();
const app = express();
const PORT = 3000;
const dotenv = require("dotenv");

// Chave secreta para o JWT (ideal: usar variável de ambiente)
const JWT_SECRET = process.env.JWT_SECRET || "chave-super-secreta";

dotenv.config();
app.use(express.json());
app.use(cors());

// --- PARTE 2: ROTAS DA API ---

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
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

// const authRoutes = require("./authCR/authRoutes");
// app.use("/auth", authRoutes);

const usersRoutes = require("./UsersCR/UsersRoutes");
app.use("/users", usersRoutes);

// --- PARTE 3: INÍCIO DO SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
