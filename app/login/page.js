"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // send the email and password; on success the API sets the token cookie
  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      // full page load so proxy.js checks the cookie just received
      window.location.href = "/dashboard";
    } else {
      setMessage(data.message); // e.g. "Invalid email or password"
    }
  };

  return (
    <div className="auth-box">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="error">{message}</p>}
      <p>
        No account yet? <Link href="/register">Register</Link>
      </p>
    </div>
  );
}