import CategoriaModel from "../models/CategoriaModels.js";

const CategoriaController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await CategoriaModel.create(data);

      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Erro interno do servidor",
          errors: ["Não foi possível processar a requisição"],
        });
      }

      if (!result.success) {
        const statusCode = result.message.includes("obrigatório") ? 400 : 500;
        return res.status(statusCode).json({
          success: false,
          message: result.message,
          errors: result.errors || [result.message],
        });
      }

      return res.status(201).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error(error);
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
      const result = await CategoriaModel.getOne(id);

      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Erro interno do servidor",
          errors: ["Não foi possível processar a requisição"],
        });
      }

      if (!result.success) {
        const statusCode = result.message.includes("não encontrado")
          ? 404
          : 500;
        return res.status(statusCode).json({
          success: false,
          message: result.message,
          errors: result.errors || [result.message],
        });
      }

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await CategoriaModel.getAll();

      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Erro interno do servidor",
          errors: ["Não foi possível processar a requisição"],
        });
      }

      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: result.message,
          errors: result.errors || [result.message],
        });
      }

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error(error);
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
      const data = req.body;
      const result = await CategoriaModel.update(id, data);

      if (!result) {
        return res.status(500).json({
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

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      });
    }
  },
};

export default CategoriaController;
