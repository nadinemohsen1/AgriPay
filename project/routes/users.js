import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  getFarmerProfile
} from "../controllers/users.js";

import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Get all users (admin + bank officer)
router.get("/", authenticate, authorize("admin", "bankOfficer"), getAllUsers);

// Get user by ID
router.get("/:id", authenticate, authorize("admin", "bankOfficer"), getUserById);

// Update user
router.put("/:id", authenticate, authorize("admin", "bankOfficer"), updateUser);

// Get farmer profile
router.get("/:userId/profile", authenticate, getFarmerProfile);

export default router;
