import jwt from "jsonwebtoken";
import UserModel from "../models/UserModels.js";

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          message: "Email e senha são obrigatórios",
        });
      }

      const result = await UserModel.login({ email, senha });

      if (!result.success) {
        return res.status(401).json({
          message: result.message,
          errors: result.errors,
        });
      }

      const usuario = result.data;
      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          cargo: usuario.cargo,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );

      const usuarioSemSenha = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
      };

      res.json({
        success: true,
        message: "Login realizado com sucesso",
        token,
        usuario: usuarioSemSenha,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  },

  logout: async (req, res) => {
    res.json({
      success: true,
      message: "Logout realizado com sucesso",
    });
  },

  verificarToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "Token não fornecido",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      res.json({
        success: true,
        message: "Token válido",
        usuario: decoded,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Token inválido ou expirado",
      });
    }
  },
};

export default AuthController;
