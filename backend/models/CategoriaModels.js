import pool from "../db/db.js";

const CategoriaModel = {
  create: async (data) => {
    try {
      const { nome, descricao } = data;
      const [result] = await pool.query(
        `INSERT INTO categorias (nome, descricao) VALUES (?, ?)`,
        [nome, descricao],
      );
      return {
        success: true,
        message: "Categoria criado com sucesso",
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
  },
};

export default CategoriaModel;
