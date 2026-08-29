import CategoriaModel from "../models/CategoriaModels.js";

const CategoriaController = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const result = await CategoriaModel.create(data);
      if (result.success) {
        res.status(201).json({
          success: true,
          message: result.message,
          data: result.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default CategoriaController;
