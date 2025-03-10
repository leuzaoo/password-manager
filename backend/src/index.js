import cookieParser from "cookie-parser";
import pool from "./config/dbConfig.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import passwordsRoutes from "./routes/passwordsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/passwords", passwordsRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} in use. Try another one.`);
    process.exit(1);
  } else {
    console.error("Server error: ", err.message);
  }
});

process.on("SIGINT", async () => {
  console.log("Closing server...");
  await pool.end();
  process.exit();
});
