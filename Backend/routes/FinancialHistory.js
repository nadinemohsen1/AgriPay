import express from "express";
import { 
  createRecord,getFarmerFinancialHistory 
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

// GET financial history for a specific farmer
router.get("/:farmerId", authenticate, authorize("bankOfficer", "admin"), getFarmerFinancialHistory);

export default router;
