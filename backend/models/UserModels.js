import pool from "../db/db.js";
import bcrypt from "bcrypt";

const UserModel = {
  login: async (data) => {
    try {
      const { email, senha } = data;

      let errors = [];

      if (!email) {
        errors.push("Email é obrigatório");
      } else if (!isValidEmail(email)) {
        errors.push("Email inválido");
      }
      if (!senha) {
        errors.push("Senha obrigatória");
      }

      if (errors.length > 0) {
        return {
          success: false,
          message: "Dados inválidos",
          errors: errors,
        };
      }

      const [userRows] = await pool.query(
        `SELECT * FROM usuarios where email = ?`,
        [email],
      );
      if (userRows.length == 0) {
        return {
          success: false,
          message: "Usuario não encontrado",
          errors: ["Usuário não encontrado"],
        };
      }

      const user = userRows[0];
      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (!isPasswordValid) {
        return {
          success: false,
          message: "Credenciais inválidas",
          errors: ["Senha incorreta"],
        };
      }
      delete user.senha;
      return {
        success: true,
        message: "Usuário logado com sucesso",
        data: user
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Erro interno ao realizar login",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },
  create: async (data) => {
    try {
      const { nome, email, senha, cargo } = data;

      const errors = [];
      if (!nome) {
        errors.push("Nome é obrigatório");
      }
      if (!email) {
        errors.push("Email é obrigatório");
      } else if (!isValidEmail(email)) {
        errors.push("Email inválido");
      }
      if (!senha || senha.length < 6) {
        errors.push("Senha deve ter no mínimo 6 caracteres");
      }

      if (errors.length > 0) {
        return {
          success: false,
          message: "Dados inválidos",
          errors: errors,
        };
      }
      const [existingUser] = await pool.query(
        "SELECT id FROM usuarios WHERE email = ?",
        [email],
      );

      if (existingUser.length > 0) {
        return {
          success: false,
          message: "Email já cadastrado",
          errors: ["Este email já está em uso"],
        };
      }

      const hashedPassword = await bcrypt.hash(senha, 10);

      const [result] = await pool.query(
        `INSERT INTO usuarios (nome, email, senha, cargo) VALUES (?, ?, ?, ?)`,
        [nome, email, hashedPassword, cargo],
      );

      return {
        success: true,
        message: "Usuário criado com sucesso",
        data: {
          id: result.insertId,
          nome: nome,
          email: email,
          cargo: cargo,
        },
      };
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return {
        success: false,
        message: "Erro interno ao criar usuário",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },
  getOne: async (id) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM usuarios where id = ?`, [
        id,
      ]);
      if (rows.length === 0) {
        return {
          success: false,
          message: "Usuário não encontrado",
          errors: ["Usuário não encontrado"],
        };
      }
      return {
        success: true,
        message: "Ok",
        data: rows[0],
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Erro interno ao buscar usuário",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },
  update: async (id, data) => {
    try {
      const { nome, senha } = data;

      if (!id) {
        return {
          success: false,
          message: "ID do usuário não fornecido",
          errors: ["ID é obrigatório"],
        };
      }

      if (!nome || !senha) {
        return {
          success: false,
          message: "Campos nome e senha são obrigatórios"
        }
      }

      const [userExists] = await pool.query(
        "SELECT id FROM usuarios WHERE id = ?",
        [id],
      );

      if (userExists.length === 0) {
        return {
          success: false,
          message: "Usuário não encontrado",
          errors: ["Usuário não encontrado"],
        };
      }

      if (!nome) {
        return {
          success: false,
          message: "Nome é obrigatório",
          errors: ["Nome é obrigatório"],
        };
      }

      if (!senha || senha.length < 6) {
        return {
          success: false,
          message: "Senha deve ter no mínimo 6 caracteres",
          errors: ["Senha deve ter no mínimo 6 caracteres"],
        };
      }

      const hashedPassword = await bcrypt.hash(senha, 10);

      await pool.query("UPDATE usuarios SET nome = ?, senha = ? WHERE id = ?", [
        nome,
        hashedPassword,
        id,
      ]);

      return {
        success: true,
        message: "Usuário atualizado com sucesso",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Erro interno ao atualizar usuário",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },
  delete: async (id) => {
    try {
      const [userExists] = await pool.query(
        `SELECT * FROM usuarios where id = ?`,
        [id],
      );

      if (userExists.length == 0) {
        return {
          success: false,
          message: "Usuário não encontrado",
          errors: ["Usuário não encontrado"],
        };
      }

      await pool.query(`DELETE FROM usuarios where id = ?`, [id]);

      return {
        success: true,
        message: "Usuário deletado com sucesso",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erro interno ao deletar usuário",
        errors: ["Ocorreu um erro inesperado. Tente novamente mais tarde."],
      };
    }
  },
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default UserModel;