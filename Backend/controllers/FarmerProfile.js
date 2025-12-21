import User from "../models/users.js";
import Transaction from "../models/Transaction.js";
import LoanApplication from "../models/LoanApplication.js";

// Get farmer basic profile (replaces previous FarmerProfile model)
export const getFarmerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.farmerId).select("-password");
    if (!user) return res.status(404).json({ message: "Farmer not found" });

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get farmer activity summary (transactions + loans)
export const getFarmerActivitySummary = async (req, res) => {
  try {
    const farmerId = req.params.farmerId;

    const transactions = await Transaction.find({ farmerId }).sort({ timestamp: -1 });

    const totalIncome = transactions.reduce((sum, t) => sum + t.amount, 0);

    const produceTypes = [...new Set(transactions.map(t => t.produceType))];

    const lastTenTransactions = transactions.slice(0, 10);

    // Fetch loans for this farmer
    const loans = await LoanApplication.find({ farmerId }).sort({ createdAt: -1 });

    const loansFormatted = loans.map((loan) => ({
      _id: loan._id,
      amount: loan.amountRequested,
      status: loan.status,
      requestedAt: loan.createdAt,
    }));

    res.json({
      farmerId,
      totalIncome,
      produceTypes,
      lastTenTransactions,
      loans: loansFormatted,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
