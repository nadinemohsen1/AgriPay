import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./FinancialHistory.css";

export default function FinancialHistoryView() {
  const { farmerId } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/financial-history/${farmerId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch financial history");
        }

        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching financial history:", err);
      }
    };

    fetchTransactions();
  }, [farmerId]);
 return (
    <div className="page">
      <h2>Financial History</h2>
      <table className="financial-history-table">
  <thead>
    <tr>
      <th>Produce Type</th>
      <th>Quantity</th>
      <th>Amount ($)</th>
      <th>Month</th>
      <th>Year</th>
      <th>Recorded At</th>
    </tr>
  </thead>
  <tbody>
    {transactions.map(t => (
      <tr key={t._id}>
        <td>{t.produceType}</td>
        <td>{t.quantity}</td>
        <td>{t.amount.toLocaleString()}</td>
        <td>{t.month}</td>
        <td>{t.year}</td>
        <td>{new Date(t.recordedAt).toLocaleDateString()}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}
