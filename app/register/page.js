
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./register.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        router.push("/login");
      } else {
        setMessage(
          data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Unable to connect. Please try again.");
    } finally {
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
            Your journey starts here.
          </h2>

          <p className={styles.sideText}>
            Create your account and enjoy a simple,
            secure, and convenient way to access
            your personal member dashboard.
          </p>

          <div className={styles.feature}>
            ✓ Simple Registration
            <br /><br />
            ✓ Secure Account Access
            <br /><br />
            ✓ Personal Dashboard
          </div>
        </aside>

        <section className={styles.formSection}>
          <p className={styles.eyebrow}>
            GET STARTED
          </p>

          <h1 className={styles.heading}>
            Create an account
          </h1>

          <p className={styles.description}>
            Enter your details below to create
            your MemberSpace account.
          </p>

          <form
            onSubmit={handleRegister}
            className={styles.form}
          >
            <div className={styles.field}>
              <label
                htmlFor="fullname"
                className={styles.label}
              >
                Full Name
              </label>

              <input
                id="fullname"
                className={styles.input}
                type="text"
                value={fullname}
                onChange={(event) =>
                  setFullname(event.target.value)
                }
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

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
                placeholder="Minimum 6 characters"
                minLength={6}
                autoComplete="new-password"
                required
              />
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {message && (
              <p className={styles.error} role="alert">
                {message}
              </p>
            )}
          </form>

          <p className={styles.footer}>
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>
              Sign In
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
