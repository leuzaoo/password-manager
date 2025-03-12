import pool from "../config/dbConfig.js";
import bcryptjs from "bcryptjs";

import generateToken from "./../config/generateToken.js";

export async function signup(req, res) {
  const { email, password } = req.body;

  let client;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de email inválido." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Senha deve conter 6 caracteres." });
    }

    if (!password || typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "Insira um tipo válido de senha." });
    }

    client = await pool.connect();

    try {
      const { rows } = await client.query(
        "SELECT id FROM users WHERE email = $1",
        [email],
      );

      if (rows.length > 0) {
        return res
          .status(400)
          .json({ message: "Email em uso. Use outro por favor." });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const newUser = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
        [email, hashedPassword],
      );

      const user = newUser.rows[0];

      const token = generateToken(user.id, res);

      res.status(201).json({
        message: "Boas vindas ao aplicativo.",
        user: { ...user, password: "" },
        token,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor, tente novamente." });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  let client;

  try {
    client = await pool.connect();

    const { rows } = await client.query(
      "SELECT id, email, password FROM users WHERE email = $1",
      [email],
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const user = rows[0];

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = generateToken(user.id, res);

    res.json({
      message: "Login realizado.",
      user: { id: user.id, email: user.email, password: "" },
      token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no servidor, tente novamente." });
  } finally {
    client.release();
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("password-manager");

    return res.status(200).json({ success: true, message: "Logout realizado" });
  } catch (error) {
    console.log("Erro no controlador de Logout:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro no servidor interno." });
  }
}

// todo: we aren't using this function below, we need to start to use.
// export async function checkAuth(req, res) {
//   try {
//     if (!req.userId) {
//       return res.status(404).json({ message: "ID de usuário inválido." });
//     }
//
//     const user = await pool.query("SELECT id, email FROM users WHERE id = $1", [
//       req.userId,
//     ]);
//
//     if (user.rows.length === 0) {
//       return res.status(404).json({ message: "Usuário não encontrado." });
//     }
//
//     res.status(200).json({ success: true, user: user.rows[0] });
//   } catch (error) {
//     console.error("Erro no controlador checkAuth:", error.message);
//     res
//       .status(500)
//       .json({ success: false, message: "Erro no servidor interno." });
//   }
// }
