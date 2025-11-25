# Reward A Farmer

**Course:** Electronic Business Development (BINF 503)  
**Semester:** Winter 2025  
**Instructor:** Dr. Nourhan Hamdi  
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa

---

## 1. Team Members

_List all team members (5-6 students) below._

| Name             | Student ID | Tutorial Group | GitHub Username |
| :--------------- | :--------- | :------------- | :-------------- |
| Nadeen Elkhalifa | 13004534      | T5          | @nadeenkhalifa     |
| Zeina Fahim | 13007626       | T5           | @zeinafahim     |
| Hania Mohsen | 13007287       | T5          | @Hania-BI     |
| Malak Madyan | 13006076       | T5           | @malakmadyan2     |
| Gamila Anwar | 13007300       | T5           | @gamilaanwar     |

---

## 2. Project Description

_Provide a detailed description of your project concept here. What is the app? What problem does it solve?_

- **Concept:** “Farmers struggle with accumulating agricultural waste that has little value and limited recycling access. Our solution is a digital platform that connects them directly to recycling facilities, turning their waste into income while giving them easy financial tools to support their farming needs. Our app allows farmers to easily authenticate their identity and request waste pickup and delivery. The integrated e-wallet enables farmers to receive incentives, manage their money directly within the app, and request microloans based on their transaction history. A clear transaction history feature helps users track payments, rewards, and all financial activities in one place.”
- **Link to Fin-Tech Course Document:** (https://www.canva.com/design/DAG42w8Iymc/Eua9EHPI2xOngmOR7N7AXg/edit)

---

## 3. Feature Breakdown

### 3.1 Full Scope

_List ALL potential features/user stories envisioned for the complete product (beyond just this course)._

- User Authentication
- Send Waste Collection Request
- Track Waste Collectors Truck Routes
- E-wallet (recieve incentives, withdraw, deposit capabilities)
- Transaction History
- Marketplace
- In App Educational Tutorials
- Microloan Request



### 3.2 Selected MVP Use Cases (Course Scope)

_From the list above, identify the **5 or 6 specific use cases** you will implement for this course. Note: User Authentication is mandatory._

1.  **User Authentication** (Registration/Login)
2.  Send Waste Collection Request
3.  E-wallet
4.  Transaction History
5.  Microloan Request


---

## 4. Feature Assignments (Accountability)

_Assign one distinct use case from Section 3.2 to each team member. This member is responsible for the full-stack implementation of this feature._

| Team Member | Assigned Use Case       | Brief Description of Responsibility              |
| :---------- | :---------------------- | :----------------------------------------------- |
| Zeina Fahim | **User Authentication** | Responsible for implementing secure user registration and login, password hashing, and JWT-based authentication. Includes role-based access control for farmers, collectors, and admin users, and protecting all restricted backend routes. |
| Malak Madyan | **Waste Delivery Request**            | Farmers submit a waste collection request with type, weight, and location. It’s saved as “pending” until a collector handles it, starting the waste-to-reward process.|
| Hania Mohsen | **Microloan Request**            | Submit and track microloan requests.           |
| Nadeen Khalifa | **E-wallet**            | Transforms waste into direct financial value, while also opening the door to formal financial services and sustainable farming practices.                    |
| Gamila Anwar | **Transaction History**            | Responsible for developing an organized financial activity log that allows farmers to view and track all transactions within the app. This includes displaying waste-to-reward payments, e-wallet deposits and withdrawals, microloan disbursements and repayments, and incentive earnings.                                   |
|                                    |

---

## 5. Data Model (Initial Schemas)

_Define the initial Mongoose Schemas for your application’s main data models (User, Transaction, Account, etc.). You may use code blocks or pseudo-code._

### User Schema

```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
  },

  phone: { 
    type: String,
    required: true,
    unique: true 
  },

  password: { 
    type: String,
    required: true 
  },

  role: {
    type: String,
    enum: ["farmer", "collector", "admin"],
    default: "farmer"
  },

  governorate: {
    type: String
  },

  village: {
    type: String
  },

  walletBalance: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);

```

### Microloan Request Schema

```javascript
const MicroloanRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },          // user's full name
  nationalId: { type: String, required: true },    // unique national ID
  mobile: { type: String, required: true },        // for contact
  amount: { type: Number, required: true },        // loan amount requested
  purpose: { type: String, required: true },       // reason for loan
  state: { 
    type: String, 
    enum: ['Submitted', 'Reviewed', 'Scored'], 
    default: 'Submitted' 
  },                                                // track progress of request
  createdAt: { type: Date, default: Date.now },    // auto-set creation time
});
```

### E-wallet Schema

```javascript
const mongoose = require('mongoose');

const EWalletSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Link to the User who owns the wallet

  balance: { 
    type: Number, 
    required: true, 
    default: 0 
  }, // Current wallet balance

  currency: { 
    type: String, 
    required: true, 
    default: 'EGP' 
  }, // Currency type (e.g., Egyptian Pound)

  transactions: [
    {
      type: { 
        type: String, 
        enum: ['credit', 'debit'], 
        required: true 
      }, // Transaction type
      amount: { 
        type: Number, 
        required: true 
      }, // Transaction amount
      description: { 
        type: String 
      }, // Optional note (e.g., "Waste reward", "Loan repayment")
      date: { 
        type: Date, 
        default: Date.now 
      } // Timestamp
    }
  ],

  createdAt: { 
    type: Date, 
    default: Date.now 
  }, // Wallet creation date

  updatedAt: { 
    type: Date, 
    default: Date.now 
  } // Last update timestamp
});

module.exports = mongoose.model('EWallet', EWalletSchema);

```
### Waste Delivery Request Schema

```javascript
// models/WasteRequest.js
import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  address: { type: String },                                      // human readable
  coords: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" }            // [lng, lat]
  }
}, { _id: false });

const WasteRequestSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  wasteType: { type: String, required: true },                    // consider enum: ["organic","plastic",...]
  estimatedWeightKg: { type: Number, required: true, min: 0 },
  // location provided manually or by GPS
  location: { type: LocationSchema, required: false },
  notes: { type: String },

  // lifecycle / assignment / verification
  status: {
    type: String,
    enum: ["pending","assigned","verified","completed","rejected","cancelled"],
    default: "pending"
  },
  assignedCollector: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedAt: Date,

  // verification data recorded by collector
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  actualWeightKg: { type: Number, min: 0 },
  verifiedAt: Date,
  verificationNotes: String,

  // reward calculation / reference to transaction(s)
  rewardTransaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },

  // audit
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

// update updatedAt on save
WasteRequestSchema.pre("save", function(next){
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("WasteRequest", WasteRequestSchema);
```
### Transaction History Schema

```javascript
const mongoose = require('mongoose');

// Transaction Schema
const TransactionSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true }, // Link to Account
  type: { 
    type: String, 
    enum: [
      'waste_to_reward', 
      'deposit', 
      'withdrawal', 
      'microloan_disbursement', 
      'microloan_repayment', 
      'incentive_earning'
    ], 
    required: true 
  }, // Transaction type
  amount: { type: Number, required: true }, // Transaction amount
  description: { type: String }, // Optional note (e.g., "Waste reward", "Loan repayment")
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' }, // Transaction status
  metadata: { type: Object }, // Flexible field for extra info (loan ID, reward source, etc.)
  date: { type: Date, default: Date.now }, // Timestamp
  createdAt: { type: Date, default: Date.now }, // Record creation date
  updatedAt: { type: Date, default: Date.now }  // Last update timestamp
});


// Export models
module.exports = {
  Transaction: mongoose.model('Transaction', TransactionSchema)
};
