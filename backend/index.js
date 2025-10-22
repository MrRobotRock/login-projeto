const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

const authRoutes = require("./authCR/authRoutes");
app.use("/auth", authRoutes);

const usersRoutes = require("./UsersCR/UsersRoutes");
app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
