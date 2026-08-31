import pool from "../db/db.js";

const ProdutoModel = {
  create: async (data) => {
    try {
      const {
        nome,
        preco,
        descricao,
        estoque,
        url,
        desconto,
        categoria_id,
        destaque,
        tamanhos
      } = data;

      const errors = [];
      if (!nome) {
        errors.push("Nome é obrigatório");
      }
      if (!preco || preco < 0) {
        errors.push("Preço deve ser um número positivo");
      }
      if (!estoque ||
        estoque < 0
      ) {
        errors.push("Estoque deve ser um número inteiro não negativo");
      }
      if (!url) {
        errors.push("URL da imagem é obrigatória");
      }
      if (!tamanhos) {
        errors.push("Informe os tamanhos disponíveis");
      }

      if (errors.length > 0) {
        return {
          success: false,
          message: "Dados inválidos",
          errors: errors,
        };
      }

      const [result] = await pool.query(
        `INSERT INTO produtos (nome, descricao, preco, estoque, imagem_url, desconto, categoria_id, destaque, tamanhos)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nome,
          descricao,
          preco,
          estoque,
          url,
          desconto,
          categoria_id,
          destaque,
          tamanhos
        ],
      );

      return {
        success: true,
        message: "Produto criado com sucesso",
        data: {
          id: result.insertId,
          nome: nome,
          preco: preco,
          descricao: descricao,
          estoque: estoque,
          url: url,
          desconto: desconto,
          categoria_id: categoria_id,
          destaque: destaque,
          tamanhos: tamanhos
        },
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro interno ao criar produto",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },

  getAll: async () => {
    try {
      const [rows] = await pool.query(`SELECT * FROM produtos`);
      return {
        success: true,
        message: "Ok",
        data: rows,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro interno ao listar produtos",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },

  getOne: async (id) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM produtos WHERE id = ?`, [
        id,
      ]);
      if (rows.length === 0) {
        return {
          success: false,
          message: "Produto não encontrado",
          errors: ["Produto não encontrado"],
        };
      }
      return {
        success: true,
        message: "Ok",
        data: rows[0],
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro interno ao buscar produto",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },

  update: async (id, data) => {
    try {
      const {
        nome,
        preco,
        descricao,
        estoque,
        url,
        desconto,
        destaque,
        categoria_id,
        tamanhos
      } = data;

      const produtoExistente = await ProdutoModel.getOne(id);
      if (!produtoExistente.success) {
        return {
          success: false,
          message: produtoExistente.message,
          errors: produtoExistente.errors || ["Produto não encontrado"],
        };
      }

      if (!nome) {
        return {
          success: false,
          message: "Nome é obrigatório",
          errors: ["Nome é obrigatório"],
        };
      }

      if (isNaN(finalPreco) || finalPreco < 0) {
        return {
          success: false,
          message: "Preço inválido",
          errors: ["Preço deve ser um número positivo"],
        };
      }

      if (isNaN(finalEstoque) || finalEstoque < 0) {
        return {
          success: false,
          message: "Estoque inválido",
          errors: ["Estoque deve ser um número inteiro não negativo"],
        };
      }

      await pool.query(
        `UPDATE produtos
         SET nome = ?, descricao = ?, preco = ?, estoque = ?,
             imagem_url = ?, desconto = ?, destaque = ?, categoria_id = ?, tamanhos = ?
         WHERE id = ?`,
        [
          nome,
          descricao,
          preco,
          estoque,
          url,
          desconto,
          destaque,
          categoria_id,
          tamanhos,
          id,
        ],
      );

      return {
        success: true,
        message: "Produto atualizado com sucesso",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro interno ao atualizar produto",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },

  delete: async (id) => {
    try {
      const produtoExistente = await ProdutoModel.getOne(id);
      if (!produtoExistente.success) {
        return {
          success: false,
          message: produtoExistente.message,
          errors: produtoExistente.errors || ["Produto não encontrado"],
        };
      }

      await pool.query(`DELETE FROM produtos WHERE id = ?`, [id]);

      return {
        success: true,
        message: "Produto deletado com sucesso",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro interno ao deletar produto",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },
};

export default ProdutoModel;