import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";

export default function Header({ onToggleSidebar }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const { user } = useContext(AuthContext);

  // Home link based on role
  let homeLink = "/";
  if (user?.role === "farmer") homeLink = "/FarmerOptions";
  else if (user?.role === "bankOfficer") homeLink = "/bank";

  // Parent-only routes (cannot be visited alone)
  const NON_CLICKABLE_PARENTS = ["dashboard", "financial-history"];

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <span className="logo-icon">🌾</span> AgriPay
        </div>
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          ☰
        </button>
      </div>

      <nav className="breadcrumbs">
        <Link to={homeLink}>Home</Link>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const isNonClickableParent =
            NON_CLICKABLE_PARENTS.includes(name) &&
            pathnames.length > index + 1;

          return (
            <span key={routeTo}>
              {" > "}
              {isLast || isNonClickableParent ? (
                <span className="current">
                  {name.replace(/-/g, " ")}
                </span>
              ) : (
                <Link to={routeTo}>
                  {name.replace(/-/g, " ")}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </header>
  );
}
