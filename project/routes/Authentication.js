import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js"; 
import { validationResult } from "express-validator";
import { registerValidation, loginValidation, resetPasswordValidation } from "../middleware/validation.js";
import { forgotPassword, resetPassword } from "../controllers/users.js";

const router = express.Router();

// Middleware to handle validation results
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", [...loginValidation], handleValidation, login);


// GET logged-in user info
router.get("/me", authenticate, me);

// Forgot password
router.post("/forgot-password", forgotPassword);

// RESET PASSWORD
router.post("/reset-password/:token", [...resetPasswordValidation], handleValidation, resetPassword);
export default router;
