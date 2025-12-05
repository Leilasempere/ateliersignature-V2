import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

  const admin = rows[0];

  if (!admin || admin.role !== "admin")
    return res.status(401).json({ message: "Accès refusé" });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign(
    { id: admin.id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};

export const getAdminOrders = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT o.id, o.amount, o.created_at, u.email, f.title AS formation_title
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN formations f ON o.formation_id = f.id
    ORDER BY o.created_at DESC
  `);

  res.json(rows);
};
