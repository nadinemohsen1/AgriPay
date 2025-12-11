import Transaction from '../models/Transaction.js';

// Create a new farmer transaction
export const createTransaction = async (req, res) => {
  try {
    const { amount, quantity, produceType } = req.body;

    const transaction = new Transaction({
      farmerId: req.user._id, // assuming user is authenticated farmer
      amount,
      quantity,
      produceType
    });

    await transaction.save();
    res.json({ message: "Transaction recorded successfully", transaction });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
