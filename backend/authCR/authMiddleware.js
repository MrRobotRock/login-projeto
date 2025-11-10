const express = require("express");
const JWT_SECRET = process.env.JWT_SECRET || "4ca88861388a21375c08e5594ad702b20efd0a31e3d3297f067077c8325e5b50";
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token ausente ou inválido" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;
