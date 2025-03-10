import express from 'express'

import { addPassword } from "../controllers/passwordsController.js"

const router = express.Router();

router.post("/add-password", addPassword)

export default router