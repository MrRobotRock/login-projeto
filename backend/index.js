
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const cors = require("cors");
const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

const JWT_SECRET = process.env.JWT_SECRET || "4ca88861388a21375c08e5594ad702b20efd0a31e3d3297f067077c8325e5b50";

dotenv.config();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

const usersRoutes = require("./UsersCR/UsersRoutes");
const authRoutes = require("./authCR/authRoutes");

app.use("/", authRoutes); 
app.use("/users", usersRoutes);

// --- PARTE 3: INÍCIO DO SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
