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
        texto_marca,
        categoria_id,
        destaque
      } = data;
      const [result] = await pool.query(
        `INSERT INTO produtos (nome, descricao, preco, estoque, imagem_url, texto_marca, categoria_id, destaque) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nome, descricao, preco, estoque, url, texto_marca, categoria_id, destaque],
      );
      return {
        success: true,
        message: "Produto criado com sucesso",
        data: result
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default ProdutoModel