import pool from "../config/dbConfig.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

export async function addPassword(req, res) {
  authenticateUser(req, res, async () => {
    const { platform, login, password } = req.body;
    const userId = req.userId; // Agora o userId já está disponível

    if (!platform || !login || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    try {
      const client = await pool.connect();

      try {
        const newPassword = await client.query(
          "INSERT INTO passwords (user_id, platform, login, password) VALUES ($1, $2, $3, $4) RETURNING id, platform, login",
          [userId, platform, login, password],
        );

        res.status(201).json({
          message: "Senha salva com sucesso.",
          password: newPassword.rows[0],
        });
      } catch (error) {
        console.error("Erro ao salvar senha no banco:", error);
        res.status(500).json({ message: error.message });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
}

export async function getAllPassword(req, res) {
  authenticateUser(req, res, async () => {
    const userId = req.userId;

    try {
      const client = await pool.connect();

      const data = await client.query(
        "SELECT * FROM passwords WHERE user_id = $1",
        [userId],
      );
      res.status(200).json(data.rows);
    } catch (error) {
      console.error("Erro ao buscar senhas:", error);
      res.status(500).json({ message: error.message });
    } finally {
      client.release();
    }
  });
}
