import jwt from "jsonwebtoken";

export default function adminAuth(req, res, next) {
  console.log("🔐 Middleware adminAuth déclenché");

  const authHeader = req.headers.authorization;
  console.log("🔍 Authorization header :", authHeader);

  if (!authHeader)
    return res.status(401).json({ message: "Token manquant." });

  const token = authHeader.split(" ")[1];
  console.log("🔑 Token reçu :", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("📦 Token décodé :", decoded);

    if (decoded.role !== "admin") {
      console.warn("⛔ Tentative d'accès NON admin :", decoded.role);
      return res.status(403).json({ message: "Accès refusé. Admin requis." });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error("❌ Erreur de validation token :", err.message);
    return res.status(401).json({ message: "Token invalide." });
  }
}
