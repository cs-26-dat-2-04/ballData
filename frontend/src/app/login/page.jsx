"use client";
import "../signup/StyleLogin.css";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CoachLogin() {
  const searchParams = useSearchParams();
  const [showToast, setShowToast] = useState(false);
  const [toastFading, setToastFading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("signup") === "success") {
      setShowToast(true);
      // Start fade-out after 2.5s, remove after 3s
      const fadeTimer = setTimeout(() => setToastFading(true), 2500);
      const removeTimer = setTimeout(() => setShowToast(false), 3000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [searchParams]);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: Sæt API_URL i .env fil
      const res = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) return setError(data.error || "Noget gik galt");
      // Vi brugte router.push før.
      // Af en eller anden grund skal vi gøre sådan her
      // Ellers er der kæmpe blank space på root siden når man bliver redirected
      window.location.href = "/";
    } catch {
      setError("Kunne ikke forbinde til serveren");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <title>Log Ind</title>
      <div className="wrapper">
        <Head>
          <h1>Log Ind</h1>
        </Head>

        {showToast && (
          <div
            className={`toast toast--success ${toastFading ? "toast--fade" : ""}`}
          >
            <span className="toast__icon">✓</span>
            Bruger oprettet! Du kan nu logge ind.
          </div>
        )}

        <h1>Log Ind</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email-input">
              <span>@</span>
            </label>
            <input
              required
              type="email"
              id="email-input"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password-input">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm296.5-223.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
              </svg>
            </label>
            <input
              required
              type="password"
              id="password-input"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Error message */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logger ind..." : "Log Ind"}
          </button>
        </form>

        <p>
          Har du ikke en bruger? <Link href="/signup">Opret Bruger</Link>
        </p>
      </div>
    </>
  );
}
