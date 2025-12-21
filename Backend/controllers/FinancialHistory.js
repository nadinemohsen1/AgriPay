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

// READ all financial history records
export const getAllRecords = async (req, res) => {
  try {
    const records = await FinancialHistory.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};