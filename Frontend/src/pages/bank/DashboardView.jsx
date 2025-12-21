import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BankOfficerPage.css";

export default function DashboardView() {
  const { farmerId } = useParams();
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState(null);
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState({
    totalLoans: 0,
    approved: 0,
    rejected: 0,
    totalIncome: 0,
    monthlyIncome: {},
    produceTypes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bank/${farmerId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch dashboard");
        }

        const data = await res.json();

        setFarmer(data.farmer);
        setLoans(data.loans || []);

        const totalLoans = (data.loans || []).length;
        const approved = (data.loans || []).filter(l => l.status === "approved").length;
        const rejected = (data.loans || []).filter(l => l.status === "rejected").length;

        setStats({
          totalLoans,
          approved,
          rejected,
          totalIncome: data.totalIncome || 0,
          monthlyIncome: data.monthlyIncome || {},
          produceTypes: data.produceTypes || [],
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [farmerId]);

  // Approve/Reject loan
  const handleLoanAction = async (loanId, action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/loan/${loanId}/review`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: action }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update loan");
      }

      const updatedLoan = await res.json();

      // Update loans in state
      setLoans(prev =>
        prev.map(l =>
          l._id === updatedLoan._id
            ? {
                ...l,
                status: updatedLoan.status,
                amount: updatedLoan.amountRequested ?? l.amount,
              }
            : l
  )
);

    } catch (err) {
      console.error(err);
      alert("Failed to update loan. Try again.");
    }
  };

  // Loading / Error
  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!farmer) return <p>Farmer not found</p>;

  return (
    <div className="page">
      <h2>Dashboard – {farmer.username}</h2>

      <div className="stats">
        <p>Total Loans: {stats.totalLoans}</p>
        <p>Approved: {stats.approved}</p>
        <p>Rejected: {stats.rejected}</p>
        <p>Total Income: ${stats.totalIncome.toLocaleString()}</p>
        <p>
          Produce Types:{" "}
          {stats.produceTypes.length > 0 ? stats.produceTypes.join(", ") : "N/A"}
        </p>
      </div>

      <h3>Recent Loan Requests</h3>
      {loans.length === 0 ? (
        <p>No loans found</p>
      ) : (
        <table className="dashboard-loans-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Reason</th> {/* New column */}
              <th>Status</th>
              <th>Requested At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(l => (
              <tr key={l._id}>
                <td>{typeof l.amount === "number" ? `$${l.amount.toLocaleString()}` : "N/A"}</td>
                <td>{l.reason || "N/A"}</td> {/* Display reason */}
                <td>{l.status}</td>
                <td>{new Date(l.createdAt).toLocaleDateString()}</td>
                <td>
                  {l.status === "pending" ? (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleLoanAction(l._id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleLoanAction(l._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>{l.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => navigate(`/bank/financial-history/${farmerId}`)}>
        View Financial History
      </button>
    </div>
  );
}
