import pool from "../config/dbConfig.js";

await pool.query(
  `
      CREATE TABLE passwords
      (
          id         SERIAL PRIMARY KEY,
          user_id    INTEGER REFERENCES users (id) ON DELETE CASCADE,
          platform   VARCHAR(255) NOT NULL,
          login      VARCHAR(255) NOT NULL,
          password   VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `
)

console.log("Passwords table created succesfully");

pool.end();
process.exit();