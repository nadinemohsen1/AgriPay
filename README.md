# AgriPay

**Course:** Electronic Business Development (BINF 503)  
**Semester:** Winter 2025  
**Instructor:** Dr. Nourhan Hamdi  
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa

---

## 1. Team Members

_List all team members (5-6 students) below._

| Name            | Student ID | Tutorial Group | GitHub Username |
| :-------------- | :--------- | :------------- | :-------------- |
| Nadine Mohsen   | 13007288   | T5             | @nadinemohsen1  |
| Nada Ehab       | 13002151   | T5             | @Nada514        |
| Chantal Victor  | 13007378   | T5             | @Chantalvictor  |
| Malak Kotb      | 13001812   | T1             | @malak-prog     |
| Kenzy Sameh     | 13001092   | T1             | @Kkenzyssameh   |
| Maryam Nasser   | 13004116   | T5             | @maryamnasserr               |


---

## 2. Project Description

- **Concept:** AgriPay — Digital Records for Cash-Based Farming
Small farmers with less than 5 acres are unable to access loan services because they operate entirely in cash, leaving no digital record of their income and preventing banks from assessing their creditworthiness.
 AgriPay solves this by providing a simple platform where farmers can log each cash transaction they make, allowing the system to automatically build a verified digital financial history. 
Farmers use the app to view their sales history, monthly income, cash flow and request loans; 
farmers record transactions by entering the id, amount, quantity, and produce type;
and banks access dashboards (by inserting farmer's id) showing farmers’ verified transaction histories, income trends, and loan requests. This enables fair credit scoring, improves cash management for farmers, and gives farmers financial visibility without changing how they work.

---

## 3. Feature Breakdown

### 3.1 Full Scope

_List ALL potential features/user stories envisioned for the complete product (beyond just this course)._

- User Authentication
- Farmer Profile Management
- Buyer Transaction Recording
- Automatic Financial History Builder
- Bank Dashboard
- Loan Application Module
- NFC card-based tap-to-record transactions
- Offline transaction recording and later synchronization
- Full bank portal for credit analysis and loan management
- Future integration with mobile wallets for digital payments




### 3.2 Selected MVP Use Cases (Course Scope)

_From the list above, identify the **5 or 6 specific use cases** you will implement for this course. Note: User Authentication is mandatory._

1.  **User Authentication** (Registration/Login)
2.  Farmer Profile Management
3.  Buyer Transaction Recording
4.  Financial History 
5.  Bank Dashboard
6.  Loan Application Module



---

## 4. Feature Assignments (Accountability)

_Assign one distinct use case from Section 3.2 to each team member. This member is responsible for the full-stack implementation of this feature._

| Team Member       | Assigned Use Case          | Brief Description of Responsibility                                                                 |
| :---------------- | :------------------------ | :-------------------------------------------------------------------------------------------------- |
| Malak Kotb        | User Authentication       | Register, Login, JWT handling, Password Hashing.                                                   |
| Kenzy Sameh       | Bank Dashboard            | Implement bank dashboard with farmer list, search, and financial history view including simple query functions(e.g. view monthly income summary.) |
| Nada Ehab         | Farmer Transactions        | Allows farmers to record a digital purchase by entering the transaction details (amount, quantity, produce type). |
| Chantal Victor    | Farmer Profile Management | Farmer profile management and activity summary (farmer details, total income, produce types, last 10 transactions). |
| Nadine Mohsen     | Financial History         |  compiles all recorded farmer transactions into a clear digital income record. |
| Mariam Nasser         |        Loan Application Module         | farmer requests loan, amount and reason stored, bank officer reviews, status updated to pending/approved/rejected                                                                                        |



---

## 5. Data Model (Initial Schemas)

_Define the initial Mongoose Schemas for your application’s main data models (User, Transaction, Account, etc.). You may use code blocks or pseudo-code._

### User Schema

```javascript
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["farmer", "bankOfficer"], required: true},
  phone: {type: String},
  createdAt: {type: Date,default: Date.now}
});
module.exports = mongoose.model("User", userSchema);
```

### Farmer Profile Management 

```javascript
const FarmerSchema = new mongoose.Schema({
  farmerId: String,
  name: String,
  contact: String
});

module.exports = mongoose.model("Farmer", FarmerSchema);
const TransactionSchema = new mongoose.Schema({
  farmerId: String,
  produceType: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
```

### Financial History

```javascript
const FinancialHistorySchema = new mongoose.Schema({
  farmerId: { 
    type: String,   // national ID of the farmer.
    required: true 
  },

  transactionId: { 
    type: String,   
    required: true 
  },

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


```
###  Loan Application Module 

```javascript
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

module.exports = mongoose.model("LoanApplication", LoanApplicationSchema);
```
### Buyer Transactions

```javascript
const TransactionSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  produceType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
