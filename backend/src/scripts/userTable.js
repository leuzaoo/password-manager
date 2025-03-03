import pool from "../config/dbConfig.js";

await pool.query(
  `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR NOT NULL,  
    secret_2fa TEXT,  
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`
);

console.log("Users table created succesfully");

pool.end();
process.exit();
