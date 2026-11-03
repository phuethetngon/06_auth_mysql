
"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load currently logged-in user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/me");

        if (!response.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setUser(data.user ?? data);
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  };

  // Loading screen
  if (loading) {
    return (
      <div className="auth-box">
        <p>Loading...</p>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="auth-box">
      <h1>Dashboard</h1>

      {user ? (
        <>
          <h2>Welcome, {user.fullname}!</h2>
          <p><strong>Name:</strong> {user.fullname}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <p>Unable to load user information.</p>
      )}

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
