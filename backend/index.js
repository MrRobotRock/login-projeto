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

const authRoutes = require("./authCR/authRoutes");
const consultoriaRoutes = require("./consultoriaCR/consultoriaRoutes");
const usersRoutes = require("./UsersCR/UsersRoutes");

app.use("/", authRoutes); 

app.use('/api/consultorias', consultoriaRoutes);

app.use("/users", authMiddleware, usersRoutes);

// Middlewares de erro 
app.use(notFound);
app.use(errorHandler);

// Início do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});