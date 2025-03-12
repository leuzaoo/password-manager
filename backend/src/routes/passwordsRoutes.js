import express from "express";

import {
  addPassword,
  getAllPassword,
} from "../controllers/passwordsController.js";

const router = express.Router();

router.post("/add-password", addPassword);

router.get("/get-password", getAllPassword);

export default router;
