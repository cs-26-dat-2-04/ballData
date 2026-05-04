"use client";
import "./StyleLogin.css";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CoachSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.repeatPassword) {
      return setError("Adgangskoderne stemmer ikke overens");
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.error || "Noget gik galt");
      }

      router.push("/login?signup=success");
    } catch (err) {
      setError("Kunne ikke forbinde til serveren");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <title>Opret Bruger</title>
      <div className="wrapper">
        <Head>
          <h1>Opret Bruger</h1>
        </Head>

        <h1>Opret Bruger</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              id="name-input"
              placeholder="Fornavn"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="repeatPassword"
              id="repeat-password-input"
              placeholder="Gentag Password"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Opretter..." : "Opret Bruger"}
          </button>
        </form>
        <p>
          Har du allerede en bruger? <Link href="/login">Log Ind</Link>
        </p>
      </div>
    </>
  );
}
