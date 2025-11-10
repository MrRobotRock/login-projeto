const express = require("express");
const router = express.Router();
const authController = require("./authController");
const authMiddleware = require("./authMiddleware");

//ROTA 1: Página de se cadastrar no sistema
router.post("/api/register", authController.register);

//ROTA 2: Página de login
router.post("/api/login", authController.login);

router.use("/api", authMiddleware);

//ROTA 3: Página que permite mudar senha
router.post("/api/forgot-password", authController.forgotPassword);

module.exports = router;
