import mongoose from 'mongoose';

const FarmerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // relation to User with role 'farmer'
  nationalId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  contact: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('FarmerProfile', FarmerProfileSchema);
