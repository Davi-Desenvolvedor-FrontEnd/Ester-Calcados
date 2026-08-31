import ProdutoModel from "../models/ProdutoModels.js";
import * as ImageService from "../services/ImageService.js";

const ProdutoController = {
  create: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Imagem é obrigatória",
          errors: ["Imagem é obrigatória"],
        });
      }

      const preco = parseFloat(req.body.preco);
      const estoque = parseInt(req.body.estoque);
      const categoria_id = req.body.categoria_id
        ? parseInt(req.body.categoria_id)
        : null;
      const desconto = parseInt(req.body.desconto);

      if (isNaN(preco) || preco < 0) {
        return res.status(400).json({
          success: false,
          message: "Preço inválido",
          errors: ["Preço deve ser um número positivo"],
        });
      }

      if (isNaN(estoque) || estoque < 0) {
        return res.status(400).json({
          success: false,
          message: "Estoque inválido",
          errors: ["Estoque deve ser um número inteiro não negativo"],
        });
      }

      let imagemProcessada = null;
      let imageUrl = "";

      try {
        if (
          ImageService &&
          typeof ImageService.processarImagem === "function"
        ) {
          imagemProcessada = await ImageService.processarImagem(
            req.file.buffer,
            req.body.desconto || 0,
            req.body.nome,
          );
          imageUrl = imagemProcessada.imagemUrl;
        }
      } catch (imageError) {
        console.error("Erro ao processar imagem:", imageError.message);
        return res.status(500).json({
          success: false,
          message: "Erro ao processar imagem",
          errors: ["Não foi possível processar a imagem"],
        });
      }

      const data = {
        nome: req.body.nome,
        preco: preco,
        descricao: req.body.descricao,
        estoque: estoque,
        url: imageUrl,
        desconto: desconto,
        categoria_id: categoria_id,
        destaque: req.body.destaque === "true" || req.body.destaque === true,
        tamanhos: req.body.tamanhos
      };

      const result = await ProdutoModel.create(data);

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

      if (imagemProcessada && imagemProcessada.imagemBuffer) {
        const pastaPublic = path.join(__dirname, "..", "public");

        if (!fs.existsSync(pastaPublic)) {
          fs.mkdirSync(pastaPublic, { recursive: true });
        }

        const caminhoSalvar = path.join(
          pastaPublic,
          imagemProcessada.nomeArquivo,
        );

        fs.writeFileSync(caminhoSalvar, imagemProcessada.imagemBuffer);
      }

      return res.status(201).json({
        success: true,
        message: "Produto criado com sucesso",
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

  getAll: async (req, res) => {
    try {
      const result = await ProdutoModel.getAll();

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
      const result = await ProdutoModel.getOne(id);

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
      const data = req.body;

      let imageUrl = null;
      if (req.file) {
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
      }

      const preco = data.preco ? parseFloat(data.preco) : undefined;
      const estoque = data.estoque ? parseInt(data.estoque) : undefined;

      if (preco !== undefined && (isNaN(preco) || preco < 0)) {
        return res.status(400).json({
          success: false,
          message: "Preço inválido",
          errors: ["Preço deve ser um número positivo"],
        });
      }

      if (estoque !== undefined && (isNaN(estoque) || estoque < 0)) {
        return res.status(400).json({
          success: false,
          message: "Estoque inválido",
          errors: ["Estoque deve ser um número inteiro não negativo"],
        });
      }

      const updateData = {
        nome: data.nome,
        preco: preco,
        descricao: data.descricao,
        estoque: estoque,
        url: imageUrl,
        texto_marca: data.texto_marca,
        destaque:
          data.destaque !== undefined
            ? data.destaque === "true" || data.destaque === true
            : undefined,
        categoria_id: data.categoria_id
          ? parseInt(data.categoria_id)
          : undefined,
        tamanhos: req.body.tamanhos
      };

      const result = await ProdutoModel.update(id, updateData);

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
      const result = await ProdutoModel.delete(id);

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

export default ProdutoController;
