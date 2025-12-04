import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// 🔧 Change this if your backend runs on a different URL/port
const API_BASE_URL = "http://localhost:3000";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("accessToken") || ""
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const json = await res.json();
        setUser(json.data.user);
      } catch (err) {
        console.error("Error loading profile", err);
        setToken("");
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [token]);

  async function login(email, password) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      const msg = errJson?.error?.message || "Login failed";
      throw new Error(msg);
    }

    const json = await res.json();
    const accessToken = json.data.accessToken;
    setToken(accessToken);
    localStorage.setItem("accessToken", accessToken);

    // Load profile after login
    const profileRes = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const profileJson = await profileRes.json();
    setUser(profileJson.data.user);
  }

  async function signup(name, email, password) {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      const msg = errJson?.error?.message || "Signup failed";
      throw new Error(msg);
    }

    // Auto-login after signup
    await login(email, password);
  }

  function logout() {
    setToken("");
    setUser(null);
    localStorage.removeItem("accessToken");
  }

  const value = {
    apiBaseUrl: API_BASE_URL,
    token,
    user,
    loading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
