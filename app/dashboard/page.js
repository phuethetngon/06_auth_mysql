
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [message, setMessage] = useState("");

  // Load the currently logged-in user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        setUser(data.user ?? data);
      } catch (error) {
        console.error("Error loading user:", error);
        setMessage("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Logout from the current session
  const handleLogout = async () => {
    setLoggingOut(true);
    setMessage("");

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Full reload clears cached dashboard state
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      setMessage("Logout failed. Please try again.");
      setLoggingOut(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>
          <h2>MemberSpace</h2>
          <p>Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  const displayName = user?.fullname || "Member";
  const displayEmail = user?.email || "Not available";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          MemberSpace
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.homeLink}>
            Home
          </Link>

          <button
            type="button"
            className={styles.logout}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? "Logging Out..." : "Logout"}
          </button>
        </nav>
      </header>

      <div className={styles.container}>
        <p className={styles.eyebrow}>
          MEMBER DASHBOARD
        </p>

        <h1 className={styles.title}>
          Welcome back, {displayName}!
        </h1>

        <p className={styles.description}>
          Here is your personal dashboard.
          View your account information and
          manage your member session.
        </p>

        {user ? (
          <div className={styles.grid}>
            <section className={styles.welcomeCard}>
              <div>
                <span className={styles.cardLabel}>
                  YOUR MEMBER SPACE
                </span>

                <h2 className={styles.welcomeTitle}>
                  Your account,
                  <br />
                  your space.
                </h2>

                <p className={styles.welcomeText}>
                  Welcome to MemberSpace!
                  Your personal dashboard is ready.
                  You can view your profile and
                  securely sign out when finished.
                </p>
              </div>

              <div className={styles.status}>
                ✓ Signed In
              </div>
            </section>

            <section className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                  {initial}
                </div>

                <div>
                  <h2 className={styles.profileTitle}>
                    My Profile
                  </h2>

                  <p className={styles.profileSubtitle}>
                    Your account information
                  </p>
                </div>
              </div>

              <div className={styles.info}>
                <span className={styles.infoLabel}>
                  FULL NAME
                </span>

                <strong className={styles.infoValue}>
                  {displayName}
                </strong>
              </div>

              <div className={styles.info}>
                <span className={styles.infoLabel}>
                  EMAIL ADDRESS
                </span>

                <strong className={styles.infoValue}>
                  {displayEmail}
                </strong>
              </div>

              <div className={styles.info}>
                <span className={styles.infoLabel}>
                  ACCOUNT STATUS
                </span>

                <strong className={styles.infoValue}>
                  Active Member
                </strong>
              </div>
            </section>
          </div>
        ) : (
          <p className={styles.error}>
            Unable to load user information.
          </p>
        )}

        {message && (
          <p className={styles.error} role="alert">
            {message}
          </p>
        )}
      </div>

      <footer className={styles.footer}>
        MemberSpace | DIT205 Web Application Development
      </footer>
    </main>
  );
}
