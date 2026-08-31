import pool from "../db/db.js";

const AvaliacaoModel = {
  create: async (data) => {
    try {
      const { produto_id, usuario_id, nota, comentario } = data;

      const errors = [];
      if (!produto_id) {
        errors.push("Id do produto não fornecido");
      }
      if (!usuario_id) {
        errors.push("Id do usuário não fornecido");
      }
      if (!nota) {
        errors.push("nota é obrigatória");
      }

      if (errors.length > 0) {
        return {
          success: false,
          message: "Dados inválidos",
          errors: errors,
        };
      }

      const [produtoExists] = await pool.query(
        `SELECT * FROM produtos where id = ?`,
        [produto_id],
      );

      if (produtoExists.length == 0) {
        return {
          success: false,
          message: "Produto não encontrado",
        };
      }

      const [usuarioExists] = await pool.query(
        `SELECT * FROM usuarios where id = ?`,
        [usuario_id],
      );

      if (usuarioExists.length == 0) {
        return {
          success: false,
          message: "Usuário não encontrado",
        };
      }

      let avaliacao_media = parseFloat(produtoExists[0].avaliacao_media) || 0;
      let avaliacao_total = parseInt(produtoExists[0].avaliacao_total) || 0;

      const nova_nota = parseFloat(nota);
      const novo_total = avaliacao_total + 1;

      const nova_media =
        (avaliacao_media * avaliacao_total + nova_nota) / novo_total;

      const nova_media_arredondada = Math.round(nova_media * 100) / 100;

      const [result] = await pool.query(
        `INSERT INTO avaliacoes (produto_id, usuario_id, nota, comentario)
         VALUES (?, ?, ?, ?)`,
        [produto_id, usuario_id, nota, comentario],
      );

      await pool.query(
        `UPDATE produtos SET avaliacao_media = ?, avaliacao_total = ?`,
        [nova_media_arredondada, novo_total],
      );

      return {
        success: true,
        message: "Avaliação criado com sucesso",
        data: {
          id: result.insertId,
        },
      };
    } catch (error) {
      console.error(error);
    }
  },

  getAll: async (produto_id) => {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM avaliacoes WHERE produto_id = ?`,
        [produto_id],
      );
      return {
        success: true,
        message: "Ok",
        data: rows,
      };
    } catch (error) {
      console.error(error);
    }
  },
};

export default AvaliacaoModel;
