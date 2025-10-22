const express = require("express");
const router = express.Router();
const authController = require("./authController");

//ROTA 1: Página de se cadastrar no sistema
router.post("/register", authController.register);

//ROTA 2: Página de login
router.post("/login", authController.login);

//ROTA 3: Página que permite mudar senha
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;
