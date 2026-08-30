import jwt from "jsonwebtoken";
import UserModel from "../models/UserModels.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token não fornecido ou formato inválido",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await UserModel.getOne(decoded.id);

    if (!result.success) {
      return res.status(401).json({
        message: "Usuário não encontrado",
      });
    }

    const usuario = result.data;

    delete usuario.senha;

    req.usuario = usuario;
    req.usuarioId = decoded.id;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Token inválido",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expirado",
      });
    }

    console.error("Erro no middleware auth:", error);
    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export default auth;
