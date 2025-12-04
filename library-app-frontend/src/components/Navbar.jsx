import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClassName = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header>
      <div className="logo-area">
        <div className="logo-circle">LA</div>
        <div className="site-title">
          <div>Library App</div>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
            Personal Book Tracker
          </div>
        </div>
      </div>
      <nav>
        <NavLink to="/" className={linkClassName}>
          Home
        </NavLink>
        {user && (
          <NavLink to="/books" className={linkClassName}>
            My Books
          </NavLink>
        )}
        {user && (
          <NavLink to="/profile" className={linkClassName}>
            My Profile
          </NavLink>
        )}
        <div className="nav-spacer" />
        {user ? (
          <>
            <span className="user-chip">
              Logged in as <strong>{user.name}</strong>
            </span>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signin" className={linkClassName}>
              Sign In
            </NavLink>
            <NavLink to="/signup" className={linkClassName}>
              Sign Up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
