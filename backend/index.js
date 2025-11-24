const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const { errorHandler, notFound } = require("./consultoriaCR/errorHandler"); 
const authMiddleware = require("./authCR/authMiddleware");

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// Importar rotas
const authRoutes = require("./authCR/authRoutes");
const consultoriaRoutes = require("./consultoriaCR/consultoriaRoutes");
const usersRoutes = require("./UsersCR/UsersRoutes");
const rolesRoutes = require("./RolesCR/RolesRoutes");

// Usar rotas
app.use("/", authRoutes); 
app.use('/api/consultorias', consultoriaRoutes);
app.use("/users", authMiddleware, usersRoutes);
app.use("/roles", authMiddleware, rolesRoutes);

// Middlewares de erro 
app.use(notFound);
app.use(errorHandler);

// Início do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});