import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./auth.css";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { registerUser } from "../../api/auth";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get role from query param
  const queryParams = new URLSearchParams(location.search);
  const roleFromQuery = queryParams.get("role") || "farmer";

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: roleFromQuery,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const res = await registerUser(form);

    if (res._id) {
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(res.message || "Registration failed");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        {/* Back link */}
        <p className="back-link" onClick={() => navigate("/account-type")}>
          ← Back to role selection
        </p>

        <h2 className="auth-title">Registration</h2>
        <p className="auth-subtitle">Complete your profile</p>

        {message && <p className="message">{message}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <InputField
            name="username"
            placeholder="🌱 Username"
            value={form.username}
            onChange={handleChange}
          />
          <InputField
            name="email"
            placeholder="✉️ Email address"
            value={form.email}
            onChange={handleChange}
          />
          <InputField
            type="password"
            name="password"
            placeholder="🔒 Create a password"
            value={form.password}
            onChange={handleChange}
          />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="🔒 Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="role-select"
          >
            <option value="farmer">Farmer</option>
            <option value="bankOfficer">Bank Officer</option>
          </select>

          <Button text="Create Account →" className="primary" />
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
