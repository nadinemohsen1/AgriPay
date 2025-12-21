import FarmerProfile from '../models/FarmerProfile.js';
import Transaction from '../models/Transaction.js';

// Get farmer basic profile
export const getFarmerProfile = async (req, res) => {
  try {
    const farmer = await FarmerProfile.findOne({ user: req.params.farmerId });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer profile not found" });
    }

    res.json(farmer);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get farmer activity summary
export const getFarmerActivitySummary = async (req, res) => {
  try {
    const farmerId = req.params.farmerId;

    const transactions = await Transaction.find({ farmerId })
      .sort({ timestamp: -1 });

    // total income
    const totalIncome = transactions.reduce((sum, t) => sum + t.amount, 0);

    // unique produce types
    const produceTypes = [...new Set(transactions.map(t => t.produceType))];

    // last 10 transactions
    const lastTen = transactions.slice(0, 10);

    res.json({
      farmerId,
      totalIncome,
      produceTypes,
      lastTenTransactions: lastTen
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
