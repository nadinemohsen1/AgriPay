import User from '../models/users.js';
import FinancialHistory from '../models/FinancialHistory.js';
import LoanApplication from '../models/LoanApplication.js';

// Search farmers by username, email, or phone
export const searchFarmers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) return res.status(400).json({ message: "Search query required" });

    const farmers = await User.find({
      role: "farmer",
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
      ]
    }).select('-password'); // exclude password

    res.json(farmers);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get detailed financial dashboard for a specific farmer
export const getFarmerDashboard = async (req, res) => {
  try {
    const { farmerId } = req.params;

    // Fetch farmer
    const farmer = await User.findById(farmerId).select('-password');
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    // Fetch financial history
    const history = await FinancialHistory.find({ farmerId });

    // Total income
    const totalIncome = history.reduce((sum, h) => sum + h.amount, 0);

    // Monthly income
    const monthlyIncome = {};
    history.forEach(h => {
      const key = `${h.year}-${h.month}`;
      monthlyIncome[key] = (monthlyIncome[key] || 0) + h.amount;
    });

    // List of produce types
    const produceTypes = [...new Set(history.map(h => h.produceType))];

    // Fetch loans
    const loans = await LoanApplication.find({ farmerId }).sort({ createdAt: -1 });

    // Map loans to include reason and other necessary fields
    const loansWithDetails = loans.map(l => ({
      _id: l._id,
      amount: l.amountRequested,
      status: l.status,
      createdAt: l.createdAt,
      reason: l.reason || "N/A",
    }));

    // Send full response
    res.json({
      farmer,
      totalIncome,
      monthlyIncome,
      produceTypes,
      loans: loansWithDetails
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
