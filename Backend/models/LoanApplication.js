import mongoose from 'mongoose';

const LoanApplicationSchema = new mongoose.Schema({
    farmerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    amountRequested: { 
        type: Number, 
        required: true 
    },
    reason: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending" 
    }
}, { timestamps: true });

export default mongoose.model("LoanApplication", LoanApplicationSchema);
