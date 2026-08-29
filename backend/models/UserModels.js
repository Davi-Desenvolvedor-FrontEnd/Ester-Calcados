import pool from "../db/db.js";
import bcrypt from "bcrypt";

const UserModel = {
  getAll: async () => {
    try {
      const [rows] = await pool.query(`SELECT * FROM usuarios`);
      return {
        success: true,
        message: "Ok",
        data: rows
      };
    } catch (error) {
      console.log(error);
    }
  },
  create: async (data) => {
    try {
      const { nome, email, senha, cargo } = data;

      const errors = [];
      if (!nome || nome.trim().length === 0) {
        errors.push("Nome é obrigatório");
      }
      if (!email || email.trim().length === 0) {
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
        [email.trim()],
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
        [nome.trim(), email.trim(), hashedPassword, cargo],
      );

      return {
        success: true,
        message: "Usuário criado com sucesso",
        data: {
          id: result.insertId,
          nome: nome.trim(),
          email: email.trim(),
          cargo: cargo || "user",
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
  login: async (data) => {
    try {
      const { email, senha } = data;
      let errors = [];
      if (!email || email.trim().length === 0) {
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

      const [userExists] = await pool.query(
        `SELECT * FROM usuarios where email = ?`,
        [email],
      );
      if (userExists.length == 0) {
        return {
          success: false,
          message: "Usuario não encontrado",
          errors: ["Erro"],
        };
      }

      const user = userExists[0];
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
        data: {
          user,
        },
      };
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (id) => {
    try {
      const [userExists] = await pool.query(`SELECT * FROM usuarios where id = ?`, [id])
      if (userExists.length == 0) {
        return {
          success: false,
          message: "Erro! Usuario não encontrado"
        }
      }
      await pool.query(`DELETE FROM usuarios where id = ?`, [id])
      return {
        success: true,
        message: "Usuario deletado com sucesso"
      }
    } catch (error) {
      console.error(error)
    }
  }
};

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default UserModel;
