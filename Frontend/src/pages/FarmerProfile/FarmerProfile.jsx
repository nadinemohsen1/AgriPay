import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./FarmerProfile.css";

export default function FarmerProfile() {
  const { user, token } = useContext(AuthContext);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchActivity = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/farmer-profile/${user._id}/activity-summary`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();
        setActivity(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [user, token]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!activity) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Total Income:</strong> ${activity.totalIncome || 0}</p>
        <p>
          <strong>Produce Types:</strong>{" "}
          {activity.produceTypes?.length ? activity.produceTypes.join(", ") : "N/A"}
        </p>

        <h3>Recent Transactions</h3>
        {activity.lastTenTransactions?.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produce</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {activity.lastTenTransactions.map((tx) => (
                <tr key={tx._id}>
                  <td>{tx._id}</td>
                  <td>{tx.produceType}</td>
                  <td>{tx.quantity || "-"}</td>
                  <td>${tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h3>Loan Applications</h3>
        {activity.loans?.length === 0 ? (
          <p>No loans applied yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Status</th>
                <th>Requested At</th>
              </tr>
            </thead>
            <tbody>
              {activity.loans.map((loan) => (
                <tr key={loan._id}>
                  <td>${loan.amount}</td>
                  <td>{loan.status}</td>
                  <td>{new Date(loan.requestedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
