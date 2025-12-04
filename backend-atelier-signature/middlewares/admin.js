export const requireAdmin = (req, res, next) => {
  // req.user est rempli par verifyToken
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé à l’administrateur." });
  }
  next();
};
