import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import passwordsRoutes from "./routes/passwordsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pool from "./config/dbConfig.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/passwords", passwordsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  pool.connect();
  console.log(`Server running on port ${PORT}`);
});
