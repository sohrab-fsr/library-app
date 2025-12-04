import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="page-card">
        <h2 className="page-title">My Profile</h2>
        <p className="page-subtitle">
          You must be signed in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="page-card">
      <h2 className="page-title">My Profile</h2>
      <p className="page-subtitle">
        Basic information about your Library App account.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Role:</strong> {user.role}
        </div>
        <div>
          <strong>Member Since:</strong>{" "}
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A"}
        </div>
      </div>
      <p className="info-text" style={{ marginTop: "0.75rem" }}>
        Profile editing and account deletion can be added in a future release.
        For this release, the focus is on authentication and book management.
      </p>
    </div>
  );
}

export default ProfilePage;
