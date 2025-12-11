import FarmerProfile from '../models/FarmerProfile.js';
import FinancialHistory from '../models/FinancialHistory.js';
import Transaction from '../models/Transaction.js';
import LoanApplication from '../models/LoanApplication.js';

// Search farmers by name, nationalId, or contact
export const searchFarmers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) return res.status(400).json({ message: "Search query required" });

    const farmers = await FarmerProfile.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { nationalId: { $regex: query, $options: 'i' } },
        { contact: { $regex: query, $options: 'i' } }
      ]
    }).populate('user', '-password');

    res.json(farmers);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get detailed financial dashboard for a specific farmer
export const getFarmerDashboard = async (req, res) => {
  try {
    const { farmerId } = req.params;

    // Get farmer basic info
    const farmer = await FarmerProfile.findOne({ user: farmerId }).populate('user', '-password');
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    // Financial summary from FinancialHistory
    const history = await FinancialHistory.find({ farmerId });

    const totalIncome = history.reduce((sum, h) => sum + h.amount, 0);

    // Monthly income summary
    const monthlyIncome = {};
    history.forEach(h => {
      const key = `${h.year}-${h.month}`;
      monthlyIncome[key] = (monthlyIncome[key] || 0) + h.amount;
    });

    // Unique produce types
    const produceTypes = [...new Set(history.map(h => h.produceType))];

    // Transaction history (optional: last 10)
    const transactions = await Transaction.find({ farmerId }).sort({ timestamp: -1 }).limit(10);

    // Loan applications
    const loans = await LoanApplication.find({ farmerId }).sort({ createdAt: -1 });

    res.json({
      farmer,
      totalIncome,
      monthlyIncome,
      produceTypes,
      lastTenTransactions: transactions,
      loans
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
