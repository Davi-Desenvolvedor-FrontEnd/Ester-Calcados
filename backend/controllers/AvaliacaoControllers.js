import AvaliacaoModel from "../models/AvaliacaoModels.js";

const AvaliacaoController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await AvaliacaoModel.create(data);
      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Erro interno no servidor",
        });
      }

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Erro interno no servidor",
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const { produto_id } = req.params;
      const result = AvaliacaoModel.getAll(produto_id);
      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Erro interno no servidor",
        });
      }
      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: result.message,
        });
      }

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Erro interno no servidor",
      });
    }
  },
};

export default AvaliacaoController;
