import express from "express";
import {
  createTransaction
} from "../controllers/Transaction.js";

import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Farmer creates transaction
router.post(
  "/",
  authenticate,
  authorize("farmer"),
  createTransaction
);

export default router;
