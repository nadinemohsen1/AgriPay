import { useNavigate } from "react-router-dom";
import "./FarmerOptions.css";

export default function FarmerOptions() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Farmer Options</h2>
      <div className="button-group">
        <button onClick={() => navigate("/transactions")}>
          Make a Transaction
        </button>
        <button onClick={() => navigate("/farmer-profile")}>
          View Profile
        </button>
        <button onClick={() => navigate("/loan")}>
          Apply for Loan
        </button>
      </div>
    </div>
  );
}
