import * as authService from "../services/auth.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  domain: ".ballebysoftware.dk",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dage
};

export async function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Navn, email og adgangskode påkrævet" });
  }

  try {
    await authService.signup({ name, email, password });
    res.status(201).json({ message: "Coach oprettet" });
  } catch (err) {
    console.error("Signup fejl:", err);
    res
      .status(err.status ?? 500)
      .json({ error: err.message ?? "Intern serverfejl" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email og adgangskode er påkrævet" });
  }

  try {
    const { token, coach } = await authService.login({ email, password });

    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ coach });
  } catch (err) {
    console.error("Login fejl:", err);
    res
      .status(err.status ?? 500)
      .json({ error: err.message ?? "Intern serverfejl" });
  }
}

export async function logout(_req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "Logget ud" });
}

export async function me(req, res) {
  try {
    const coach = await authService.getMe(req.coach.id);
    res.json({ coach });
  } catch (err) {
    console.error("Me fejl:", err);
    res
      .status(err.status ?? 500)
      .json({ error: err.message ?? "Intern serverfejl" });
  }
}
