import pool from "../db/db.js";

const CategoriaModel = {
  create: async (data) => {
    try {
      const { nome, descricao } = data;

      if (!nome) {
        return {
          success: false,
          message: "Nome é obrigatório",
          errors: ["Nome é obrigatório"],
        };
      }

      const [result] = await pool.query(
        "INSERT INTO categorias (nome, descricao) VALUES (?, ?)",
        [nome.trim(), descricao],
      );

      return {
        success: true,
        message: "Categoria criada com sucesso",
        data: {
          id: result.insertId,
          nome: nome,
          descricao: descricao || null,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro interno ao criar categoria",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },

  getOne: async (id) => {
    try {
      const [rows] = await pool.query("SELECT * FROM categorias WHERE id = ?", [
        id,
      ]);

      if (rows.length === 0) {
        return {
          success: false,
          message: "Categoria não encontrada",
          errors: ["Categoria não encontrada"],
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
        message: "Erro interno ao buscar categoria",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },

  getAll: async () => {
    try {
      const [rows] = await pool.query("SELECT * FROM categorias");
      return {
        success: true,
        message: "Ok",
        data: rows,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro interno ao listar categorias",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },

  update: async (id, data) => {
    try {
      const { nome, descricao } = data;

      if (!id) {
        return {
          success: false,
          message: "ID não fornecido",
          errors: ["ID é obrigatório"],
        };
      }

      if (!nome) {
        return {
          success: false,
          message: "Nome é obrigatório",
          errors: ["Nome é obrigatório"],
        };
      }

      const [rows] = await pool.query(
        "SELECT id FROM categorias WHERE id = ?",
        [id],
      );

      if (rows.length === 0) {
        return {
          success: false,
          message: "Categoria não encontrada",
          errors: ["Categoria não encontrada"],
        };
      }

      await pool.query(
        "UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?",
        [nome, descricao, id],
      );

      return {
        success: true,
        message: "Categoria atualizada com sucesso",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro interno ao atualizar categoria",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },
};

export default CategoriaModel;
