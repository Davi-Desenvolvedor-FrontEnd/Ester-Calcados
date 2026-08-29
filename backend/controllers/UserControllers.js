import UserModel from "../models/UserModels.js";

const UserController = {
  getAll: async (req, res) => {
    try {
      const result = await UserModel.getAll();
      if (!result) {
        res.status(404).json({
          message: "Erro",
        });
      }
      if (result.success) {
        res.status(200).json({
          message: result.message,
          data: result.data,
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      });
    }
  },
  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await UserModel.create(data);

      if (result.success) {
        return res.status(201).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      } else {
        let statusCode = 400;
        if (result.message.includes("Email já cadastrado")) {
          statusCode = 409;
        } else if (result.message.includes("interno")) {
          statusCode = 500;
        }

        return res.status(statusCode).json({
          success: false,
          message: result.message,
          errors: result.errors,
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      });
    }
  },
  login: async (req, res) => {
    try {
      const data = req.body;
      const result = await UserModel.login(data);

      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Erro interno do servidor",
          errors: ["Não foi possível processar a requisição"],
        });
      }

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      } else {
        let statusCode = 400;
        if (
          result.message.includes("Usuário não encontrado") ||
          result.message.includes("Credenciais inválidas")
        ) {
          statusCode = 401;
        } else if (result.message.includes("interno")) {
          statusCode = 500;
        }

        return res.status(statusCode).json({
          success: false,
          message: result.message,
          errors: result.errors || [result.message],
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const result = await UserModel.delete(id);
    if (!result) {
      res.status(500).json({
        success: false,
        message: "Erro interno",
      });
    }
    
    if (result.success) {
      res.status(200).json({
        success: true,
        message: result.message
      })
    } else {
      if (result.message.includes("Usuario não encontrado")) {
        res.status(404).json({
          success: false,
          message: "Usuario não encontrado"
        })
      }
    }
  },
};

export default UserController;
