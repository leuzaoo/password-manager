import pool from "../config/dbConfig.js";

await pool.query(
  `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,  
    secret_2fa VARCHAR(255),  
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`,
);

console.log("Users table created succesfully");

pool.end();
process.exit();
