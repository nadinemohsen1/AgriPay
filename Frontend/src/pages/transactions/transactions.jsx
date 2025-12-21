// pages/transactions/FarmerTransactions.jsx
import { useState, useContext } from "react";
import "./transactions.css";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { addTransaction } from "../../api/transactions";
import { AuthContext } from "../../context/AuthContext";

export default function Transactions() {
  const { token } = useContext(AuthContext); // get token from AuthContext
  const [form, setForm] = useState({ amount: "", quantity: "", produceType: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const body = {
      produceType: form.produceType,
      quantity: Number(form.quantity),
      amount: Number(form.amount),
    };
    const transaction = await addTransaction(body, token);

    // backend returns the transaction object directly
    if (transaction && transaction._id) {
      setMessage("Transaction recorded successfully!");
      setForm({ amount: "", quantity: "", produceType: "" });
    } else {
      setMessage("Failed to record transaction");
    }
  } catch (err) {
    console.error("Transaction error:", err);
    setMessage("Server error. Try again later.");
  }
};


  return (
    <div className="transactions-container">
      <h2>Record a New Transaction</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="transactions-form">
        <InputField
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <InputField
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <InputField
          name="produceType"
          placeholder="Produce Type"
          value={form.produceType}
          onChange={handleChange}
        />
        <Button text="Add Transaction" />
      </form>
    </div>
  );
}
