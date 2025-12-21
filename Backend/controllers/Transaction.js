import Transaction from "../models/Transaction.js";
import FinancialHistory from "../models/FinancialHistory.js";

export const createTransaction = async (req, res) => {
  try {
    // Create transaction
    const transaction = await Transaction.create({
      farmerId: req.user.id,   
      produceType: req.body.produceType,
      quantity: req.body.quantity,
      amount: req.body.amount,
    });

    // Create financial history record
    await FinancialHistory.create({
      farmerId: req.user.id,           
      transactionId: transaction._id,  
      produceType: transaction.produceType,
      quantity: transaction.quantity,
      amount: transaction.amount,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(400).json({ error: err.message });
  }
};
