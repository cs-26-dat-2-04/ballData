"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../CoachSignup/StyleLogin.css";

export default function CoachLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fejl, setFejl] = useState("");

  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setFejl("Udfyld både email og adgangskode");
      return;
    }

    if (email === "coach@test.dk" && password === "1234") {
      setFejl("");
      router.push("/");
    } else {
      setFejl("Forkert email eller adgangskode");
    }
  }

  return (
    <div className="wrapper">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-input">
            <span>@</span>
          </label>
          <input
            required
            type="email"
            id="email-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password-input">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm296.5-223.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
            </svg>
          </label>
          <input
            required
            type="password"
            id="password-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 🔴 Error message */}
        {fejl && <p style={{ color: "var(--red)" }}>{fejl}</p>}

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an Account? <a href="/CoachSignup">Sign Up</a>
      </p>
    </div>
  );
}