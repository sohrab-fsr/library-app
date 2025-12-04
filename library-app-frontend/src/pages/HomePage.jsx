import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="page-card">
      <h1 className="hero-title">Welcome to Library App</h1>
      <p className="hero-tagline">
        A simple web application to keep track of the books you own, have read,
        or plan to read.
      </p>
      <div className="hero-actions">
        {user ? (
          <>
            <Link to="/books">
              <button className="btn btn-primary">Go to My Books</button>
            </Link>
            <Link to="/profile">
              <button className="btn btn-outline">View My Profile</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin">
              <button className="btn btn-primary">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-outline">Create an Account</button>
            </Link>
          </>
        )}
      </div>
      <p className="page-subtitle">
        On this site, each user manages their own personal library. Once you sign
        in, you can add new books, edit existing ones, and remove books you no
        longer want to track.
      </p>
      <div>
        <span className="badge">Release 2</span>{" "}
        <span className="pill">Frontend + Backend Integration</span>
      </div>
    </div>
  );
}

export default HomePage;
