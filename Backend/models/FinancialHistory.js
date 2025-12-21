import mongoose from 'mongoose';

const FinancialHistorySchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  produceType: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  month: { type: Number, required: true },   
  year: { type: Number, required: true },
  recordedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('FinancialHistory', FinancialHistorySchema);
