import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  if (!user) return null; // safety

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose?.();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h2>AgriPay</h2>

      <nav className="sidebar-nav">
        {/* ---------- FARMER MENU ---------- */}
        {user.role === "farmer" && (
          <>
            <NavLink to="/FarmerOptions" onClick={onClose}>
              Dashboard
            </NavLink>

            <NavLink to="/farmer-profile" onClick={onClose}>
              My Profile
            </NavLink>

            <NavLink to="/transactions" onClick={onClose}>
              Transactions
            </NavLink>

            <NavLink to="/loan" onClick={onClose}>
              Apply for Loan
            </NavLink>
          </>
        )}

        {/* ---------- BANK OFFICER MENU ---------- */}
        {user.role === "bankOfficer" && (
          <>
            <NavLink to="/bank" onClick={onClose}>
              Search Farmers
            </NavLink>
          </>
        )}
      </nav>

      <button className="primary logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
