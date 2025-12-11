import express from "express";
import { 
  createRecord, 
  getAllRecords 
} from "../controllers/FinancialHistory.js";

import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authenticate,
  authorize("admin", "bankOfficer", "farmer"),
  createRecord
);

// READ all
router.get(
  "/",
  authenticate,
  authorize("admin", "bankOfficer"),
  getAllRecords
);

export default router;
