import express from "express";
import { searchFarmers, getFarmerDashboard } from "../controllers/BankDashboard.js";
import { authenticate, authorize } from "../middleware/auth.js";


const router = express.Router();

// Only bank officers and admin can access
router.get("/search", authenticate, authorize("bankOfficer", "admin"), searchFarmers);
router.get("/:farmerId", authenticate, authorize("bankOfficer", "admin"), getFarmerDashboard);



export default router;
