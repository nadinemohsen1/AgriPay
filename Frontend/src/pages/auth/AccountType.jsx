import "./accountType.css";
import { useNavigate } from "react-router-dom";

export default function AccountType() {
  const navigate = useNavigate();

  return (
    <div className="account-type-page">
      <h1>Create Account</h1>
      <p className="subtitle">Choose your account type</p>

      <div className="card-container">
        <div
          className="role-card"
          onClick={() => navigate("/register?role=farmer")}
        >
          <span className="icon">🌾</span>
          <h3>Farmer</h3>
          <p>
            Record transactions, view income history, apply for loans
          </p>
        </div>

        <div
          className="role-card"
          onClick={() => navigate("/register?role=bankOfficer")}
        >
          <span className="icon">🏦</span>
          <h3>Bank Officer</h3>
          <p>
            Access farmer dashboards, review financial histories, manage loans
          </p>
        </div>
      </div>

      <p className="footer-text">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            background: "none",
            border: "none",
            color: "#2e7d32",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
