"use client";

import { FormEvent, useState } from "react";

export const revalidate = 0;

export default function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      setError("Invalid admin credentials.");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <p className="eyebrow">Admin Access</p>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <label>
            <span>Username</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error ? <p className="form-message error">{error}</p> : null}
          <button type="submit" className="button primary wide">Log in</button>
        </form>
      </div>
    </div>
  );
}
