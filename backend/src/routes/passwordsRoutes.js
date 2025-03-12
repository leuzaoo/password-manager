import express from "express";

import {
  addPassword,
  deletePassword,
  getAllPassword,
  updatePassword,
} from "../controllers/passwordsController.js";

const router = express.Router();

router.post("/add-password", addPassword);

router.put("/update-password/:id", updatePassword);

router.get("/get-password", getAllPassword);

router.delete("/delete-password/:id", deletePassword);

export default router;
