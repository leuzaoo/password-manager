import pool from "../config/dbConfig.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

export async function addPassword(req, res) {
  authenticateUser(req, res, async () => {
    const { platform, login, password } = req.body;
    const userId = req.userId;

    if (!platform || !login || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    let client;

    try {
      client = await pool.connect();

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
      if (client) {
        client.release();
      }
    }
  });
}

export async function updatePassword(req, res) {
  authenticateUser(req, res, async () => {
    const { id } = req.params;
    const { platform, login, password } = req.body;
    const userId = req.userId;

    if (!platform || !login || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    let client;

    try {
      client = await pool.connect();

      const result = await client.query(
        `UPDATE passwords
           SET platform = $1, login = $2, password = $3
           WHERE id = $4 AND user_id = $5
             RETURNING id, platform, login, password`,
        [platform, login, password, id, userId],
      );

      if (result.rowCount === 0) {
        return res.status(404).json({
          message:
            "Senha não encontrada ou você não tem permissão para editá-la.",
        });
      }

      res.status(200).json({
        message: "Senha atualizada com sucesso.",
        password: result.rows[0],
      });
    } catch (error) {
      console.error("Erro ao atualizar a senha: ", error);
      res.status(500).json({ message: error.message });
    } finally {
      if (client) {
      }
    }
  });
}

export async function deletePassword(req, res) {
  authenticateUser(req, res, async () => {
    const { id } = req.params;
    const userId = req.userId;

    if (!id) {
      return res.status(400).json({ message: "ID da senha é obrigatório." });
    }

    let client;

    try {
      client = await pool.connect();

      const passwordCheck = await client.query(
        "SELECT * FROM passwords WHERE id = $1 AND user_id = $2",
        [id, userId],
      );

      if (passwordCheck.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Senha não encontrada ou não pertence a você." });
      }

      await client.query("DELETE FROM passwords WHERE id = $1", [id]);

      res.status(200).json({ message: "Senha excluída com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar senha no banco:", error);
      res.status(500).json({ message: error.message });
    } finally {
      if (client) {
        client.release();
      }
    }
  });
}

export async function getAllPassword(req, res) {
  authenticateUser(req, res, async () => {
    const userId = req.userId;

    let client;

    try {
      client = await pool.connect();

      const data = await client.query(
        "SELECT * FROM passwords WHERE user_id = $1",
        [userId],
      );
      res.status(200).json(data.rows);
    } catch (error) {
      console.error("Erro ao buscar senhas:", error);
      res.status(500).json({ message: error.message });
    } finally {
      if (client) {
        client.release();
      }
    }
  });
}
