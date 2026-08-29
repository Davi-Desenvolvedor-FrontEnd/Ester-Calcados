import ProdutoModel from "../models/ProdutoModels.js";
import * as ImageService from "../services/ImageService.js";

const ProdutoController = {
  create: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Imagem é obrigatória",
        });
      }
      let imageUrl = "";

      try {
        if (
          ImageService &&
          typeof ImageService.processarImagem === "function"
        ) {
          const processed = await ImageService.processarImagem(
            req.file.buffer,
            req.body.texto_marca || "LOJA OFICIAL",
          );
          imageUrl = processed.url;
        } else {
          imageUrl = `/uploads/${req.file.originalname}`;
        }
      } catch (imageError) {
        console.error("Erro ao processar imagem:", imageError.message);
        imageUrl = `/uploads/${req.file.originalname}`;
      }

      if (!imageUrl) {
        const extensao = req.file.originalname.split(".").pop();
        imageUrl = `/uploads/produto_${Date.now()}.${extensao}`;
      }
      const data = {
        nome: req.body.nome,
        preco: parseFloat(req.body.preco),
        descricao: req.body.descricao || "",
        estoque: parseInt(req.body.estoque) || 0,
        url: imageUrl,
        texto_marca: req.body.texto_marca || "LOJA OFICIAL",
        categoria_id: req.body.categoria_id
          ? parseInt(req.body.categoria_id)
          : null,
        destaque:
          req.body.destaque === "true" || req.body.destaque === true || false,
      };
      const result = await ProdutoModel.create(data);
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

export default ProdutoController;
