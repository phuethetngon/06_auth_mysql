
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../register/register.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        // Full reload so proxy.js checks the new cookie
        window.location.href = "/dashboard";
      } else {
        setMessage(
          data.message || "Invalid email or password."
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          MemberSpace
        </Link>

        <Link href="/" className={styles.back}>
          ← Back to Home
        </Link>
      </header>

      <div className={styles.container}>
        <aside className={styles.side}>
          <span className={styles.sideLabel}>
            MEMBERSPACE PORTAL
          </span>

          <h2 className={styles.sideTitle}>
            Welcome back to MemberSpace.
          </h2>

          <p className={styles.sideText}>
            Sign in to your account and continue
            managing your personal member profile
            through a simple and secure dashboard.
          </p>

          <div className={styles.feature}>
            ✓ Secure Member Login
            <br />
            <br />
            ✓ Personal Account Dashboard
            <br />
            <br />
            ✓ Easy Account Access
          </div>
        </aside>

        <section className={styles.formSection}>
          <p className={styles.eyebrow}>
            WELCOME BACK
          </p>

          <h1 className={styles.heading}>
            Sign in to your account
          </h1>

          <p className={styles.description}>
            Enter your email address and password
            to access your MemberSpace dashboard.
          </p>

          <form
            onSubmit={handleLogin}
            className={styles.form}
          >
            <div className={styles.field}>
              <label
                htmlFor="email"
                className={styles.label}
              >
                Email Address
              </label>

              <input
                id="email"
                className={styles.input}
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.field}>
              <label
                htmlFor="password"
                className={styles.label}
              >
                Password
              </label>

              <input
                id="password"
                className={styles.input}
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {message && (
              <p className={styles.error} role="alert">
                {message}
              </p>
            )}
          </form>

          <p className={styles.footer}>
            Don't have an account?{" "}
            <Link
              href="/register"
              className={styles.link}
            >
              Create an Account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
