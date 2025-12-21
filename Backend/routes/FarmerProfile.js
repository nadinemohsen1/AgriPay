import express from "express";
import { 
  getFarmerProfile, 
  getFarmerActivitySummary 
} from "../controllers/FarmerProfile.js";

const router = express.Router();

// Get farmer profile
router.get("/:farmerId", getFarmerProfile);

// Get farmer activity summary (income, produce types, last 10 transactions)
router.get("/:farmerId/activity-summary", getFarmerActivitySummary);

export default router;
