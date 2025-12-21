import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  produceType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', TransactionSchema);
