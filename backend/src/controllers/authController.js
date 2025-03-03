import pool from "../config/dbConfig.js";
import bcryptjs from "bcryptjs";

import generateToken from "./../config/generateToken.js";

export async function signup(req, res) {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    res.status(201).json({
      message: "Usuário registrado.",
      user: { ...user.rows[0], password: "" },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Dados ou credenciais inválidos." });
    }

    const validPassword = await bcryptjs.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Dados ou credenciais inválidos." });
    }

    const token = generateToken(user._id, res);

    res.json({
      message: "Login realizado.",
      user: { ...user.rows[0], password: "" },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
// todo at this line
export async function checkAuth(req, res) {
  try {
    if (!req.userId) {
      return res.status(404).json({ message: "ID de usuário inválido." });
    }

    const user = await pool.query("SELECT id, email FROM users WHERE id = $1", [
      req.userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({ success: true, user: user.rows[0] });
  } catch (error) {
    console.error("Erro no controlador checkAuth:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro no servidor interno." });
  }
}
