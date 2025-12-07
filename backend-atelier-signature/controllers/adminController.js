import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  const admin = rows[0];

  if (!admin || admin.role !== "admin")
    return res.status(401).json({ message: "Accès non autorisé" });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign(
    { id: admin.id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};


export const getOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT 
        c.id,
        c.date_creation,
        c.status,
        u.email AS user_email,
        f.title AS formation_title
      FROM commandes c
      LEFT JOIN users u ON u.id = c.user_id
      LEFT JOIN formations f ON f.id = c.formation_id
      ORDER BY c.date_creation DESC`
    );

    return res.json(orders);

  } catch (error) {
    console.error("Erreur getOrders :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
