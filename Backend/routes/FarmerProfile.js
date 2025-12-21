import express from "express";
import { 
  getFarmerProfile, 
  getFarmerActivitySummary 
} from "../controllers/FarmerProfile.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Protect routes
router.get("/:farmerId", authenticate, getFarmerProfile);
router.get("/:farmerId/activity-summary", authenticate, getFarmerActivitySummary);

export default router;
