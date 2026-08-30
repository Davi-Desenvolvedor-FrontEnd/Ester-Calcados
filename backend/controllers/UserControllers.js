import UserModel from "../models/UserModels.js";

const UserController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await UserModel.create(data);

      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Erro interno do servidor",
          errors: ["Não foi possível processar a requisição"],
        });
      }

      if (result.success) {
        return res.status(201).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      }

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
    } catch (error) {
      console.error("Erro:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await UserModel.getAll(id);

      if (!result) {
        res.status(500).json({
          success: false,
          message: "Erro interno do servidor",
          errors: ["Não foi possível processar a requisição"],
        });
      }

      if (!result.success) {
        const statusCode = result.message.includes("não encontrado")
          ? 404
          : 400;
        return res.status(statusCode).json({
          success: false,
          message: result.message,
          errors: result.errors || [result.message],
        });
      }

      res.status(200).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error("Erro:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await UserModel.update(id);
      if (!result) {
        res.status(500).json({
          success: false,
          message: "Erro interno do servidor",
          errors: ["Não foi possível processar a requisição"],
        });
      }

      if (result.success) {
        return res.status(200).json({
          success: true,
          message: result.message,
        });
      }

      const statusCode = result.message.includes("não encontrado") ? 404 : 400;
      return res.status(statusCode).json({
        success: false,
        message: result.message,
        errors: result.errors || [result.message],
      });
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
    try {
      const { id } = req.params;

      const result = await UserModel.delete(id);
      if (!result) {
        res.status(500).json({
          success: false,
          message: "Erro interno",
          errors: ["Não foi possível processar a requisição"],
        });
      }

      if (result.success) {
        res.status(200).json({
          success: true,
          message: result.message,
        });
      }
      const statusCode = result.message.includes("não encontrado") ? 404 : 400;
      return res.status(statusCode).json({
        success: false,
        message: result.message,
        errors: result.errors || [result.message],
      });
    } catch (error) {
      console.error("Erro:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      });
    }
  },
};

export default UserController;