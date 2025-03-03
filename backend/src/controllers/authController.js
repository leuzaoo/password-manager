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
