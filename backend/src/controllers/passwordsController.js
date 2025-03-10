import pool from "../config/dbConfig.js";
import jwt from "jsonwebtoken";

export async function addPassword(req, res) {
  const { platform, login, password } = req.body;

  const token = req.cookies["password-manager"];

  if (!token) {
    return res.status(401).json({ message: "Usuário precisa estar logado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      return res.status(401).json({ message: "Token inválido." });
    }

    if (!platform) {
      return res.status(400).json({ message: "Campo de plataforma vazio." });
    }

    if (!login) {
      return res.status(400).json({ message: "Campo de login vazio." });
    }

    if (!password) {
      return res.status(400).json({ message: "Campo de senha vazio." });
    }

    const newPassword = await pool.query(
      "INSERT INTO passwords (user_id, platform, login, password) VALUES ($1, $2, $3, $4) RETURNING id, platform, login",
      [userId, platform, login, password],
    );

    res.status(201).json({
      message: "Senha salva com sucesso.",
      password: {
        id: newPassword.rows[0].id,
        platform: newPassword.rows[0].platform,
        login: newPassword.rows[0].login,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
