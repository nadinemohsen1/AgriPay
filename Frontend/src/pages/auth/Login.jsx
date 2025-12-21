import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { loginUser } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await loginUser({ email, password });

    if (res.token) {
      login(res.token);

      if (res.user.role === "farmer") navigate("/FarmerOptions");
      else if (res.user.role === "bankOfficer") navigate("/bank");
      else navigate("/");
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-box">
        <h1 className="logo">🌱 AgriPay</h1>
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">
          Sign in to your account to continue
        </p>

        {error && <div className="error-box">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-field">
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <Button text="Sign In" className="primary" />
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/account-type")}
            style={{
              background: "none",
              border: "none",
              color: "#2e7d32",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}
