import express from "express";
import { body } from "express-validator";
import {
  createLoan,
  getAllLoans,
  getLoanById,
  getMyLoans,
  updateLoan,
  deleteLoan,
  reviewLoan
} from "../controllers/Loan.js";

import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// Create loan (farmer)
router.post(
  '/',
  authenticate,
  authorize('farmer'),
  body('amountRequested')
    .isFloat({ gt: 0 })
    .withMessage('amountRequested must be > 0'),
  createLoan
);

// bank/admin view all loans
router.get("/", authenticate, authorize("bankOfficer", "admin"), getAllLoans);

// get one loan
router.get("/:id", authenticate, getLoanById);

// farmer views own loans
router.get("/me/mine", authenticate, authorize("farmer"), getMyLoans);

// update loan
router.put("/:id", authenticate, authorize("farmer"), updateLoan);

// delete loan
router.delete("/:id", authenticate, authorize("farmer"), deleteLoan);

// approve/reject (bank)
router.put("/:id/review", authenticate, authorize("bankOfficer"), reviewLoan);

export default router;
