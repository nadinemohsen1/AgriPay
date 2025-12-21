import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./loan.css";

export default function Loan() {
  const { user, token } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loans, setLoans] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch farmer's loans
  const fetchMyLoans = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/loan/me/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLoans(data);
    } catch (err) {
      console.error("Error fetching loans", err);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchMyLoans();
    }
  }, [user, token]);

  // Submit new loan
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/loan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amountRequested: amount, reason }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Loan requested successfully!");
        setAmount("");
        setReason("");
        fetchMyLoans(); // refresh loan list
      } else {
        setMessage(data.message || "Loan request failed");
      }
    } catch (err) {
      setMessage("Error submitting loan");
    }
  };

  return (
    <div className="loan-container">
      <h2>Request a Loan</h2>

      {message && <p className="message">{message}</p>}

      <form className="loan-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button type="submit">Request Loan</button>
      </form>

      <h3>My Loans</h3>
      {loans.length === 0 ? (
        <p>No loans requested yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Requested At</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>${loan.amountRequested}</td>
                <td>{loan.reason || "-"}</td>
                <td>{loan.status}</td>
                <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
