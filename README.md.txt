# Template README for BINF 503 Project

## Open on GitHub: [template\_\_README.md](https://github.com/nourgaser-giu/giu-bi-ebd-w2025/blob/main/template__milestone0_README.md)

## Download (ctrl+s to save): [template\_\_README.md](https://raw.githubusercontent.com/nourgaser-giu/giu-bi-ebd-w2025/main/template__milestone0_README.md)

<!-- Delete all of the above for your submission -->

# [Insert Project Name Here]

**Course:** Electronic Business Development (BINF 503)  
**Semester:** Winter 2025  
**Instructor:** Dr. Nourhan Hamdi  
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa

---

## 1. Team Members

_List all team members (5-6 students) below._

| Name             | Student ID | Tutorial Group | GitHub Username |
| :--------------- | :--------- | :------------- | :-------------- |
| [Nada Ehab]      |[13002151]  | [T5]           | [@Nada514]      |
| [Malak Kotb]     |[13001812]  | [T1]           | [@malak-prog]   |
| [Kenzy Sameh]    |[13001092]  | [T1]           | [@kkenzyssameh] |
| [Maryam Nasser] | [13004116]  | [T5]           | [@maryamnasserr]|
| [Chantal Victor] |[13007378]  | [T5]           | [@Chantalvictor]     |
| [Student 6 Name] | [ID]       | [T#]           | [@username]     |

---

## 2. Project Description

_Provide a detailed description of your project concept here. What is the app? What problem does it solve?_

- **Concept:** [Brief Summary]
- **Link to Fin-Tech Course Document:** [Insert Link if applicable]

---

## 3. Feature Breakdown

### 3.1 Full Scope

_List ALL potential features/user stories envisioned for the complete product (beyond just this course)._

- Feature A
- Feature B
- Feature C
- ...

### 3.2 Selected MVP Use Cases (Course Scope)

_From the list above, identify the **5 or 6 specific use cases** you will implement for this course. Note: User Authentication is mandatory._

1.  **User Authentication** (Registration/Login)
2.  [Use Case 2 Title]
3.  **buyer creates a transaction**
4.  [Use Case 4 Title]
5.  [Use Case 5 Title]
6.  [Use Case 6 Title - if 6 members]

---

## 4. Feature Assignments (Accountability)

_Assign one distinct use case from Section 3.2 to each team member. This member is responsible for the full-stack implementation of this feature._

| Team Member | Assigned Use Case       | Brief Description of Responsibility              |
| :---------- | :---------------------- | :----------------------------------------------- |
| [malak kotb] | **User Authentication** | Register, Login, JWT handling, Password Hashing. |
| [Kenzy Sameh] |**Bank Dashboard**     | Implement bank dashboard with farmer list, search, and financial history view including monthly income overview.       |
| [Nada Ehab]| **buyer transactions**            |**It allows buyers to record a digital purchase by selecting a farmer and entering the transaction details (amount, quantity, produce type).**
         |
| [Chantal Victor] | **Farmer Profile Management**   |[Farmer Profile management and activity summary (farmer details, total income, transaction summary, produce types, last 10 transactions)]                     |
| [Maryam Nasser] | **Loan Application**            | [Loan Application (farmer requests loan, amount and reason stored, bank officer reviews, status updated to pending/approved/rejected)]                                    |
| [Student 6] | [Use Case 6]            | [Description]                                    |

---

## 5. Data Model (Initial Schemas)

_Define the initial Mongoose Schemas for your application’s main data models (User, Transaction, Account, etc.). You may use code blocks or pseudo-code._

### User Schema

```javascript
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["farmer", "buyer", "bankOfficer"], required: true},
  phone: {type: String},
  createdAt: {type: Date,default: Date.now}
});
module.exports = mongoose.model("User", userSchema);
```

### Buyer transaction Schema

```javascript
const TransactionSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  produceType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

```

### Farmer Profile Management Schema


```javascript
const FarmerSchema = new mongoose.Schema({
  farmerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  contact: { type: String },
});

module.exports = mongoose.model("Farmer", FarmerSchema);
const TransactionSchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  produceType: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
```
### Loan Applictaion 
const LoanApplicationSchema = new mongoose.Schema({
    farmerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    bankOfficerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
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
