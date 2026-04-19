import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Ingen token angivet" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.coach = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Ugyldig eller udløbet token" });
  }
};

export default auth;
