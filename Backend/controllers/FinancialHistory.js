import FinancialHistory from "../models/FinancialHistory.js";

// CREATE a financial history record
export const createRecord = async (req, res) => {
  try {
    const record = await FinancialHistory.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET financial history for a specific farmer
export const getFarmerFinancialHistory = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const records = await FinancialHistory.find({ farmerId }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch financial history", error: err.message });
  }
};