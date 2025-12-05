import pool from "../config/db.js";

export const getOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT 
          o.id,
          o.amount,
          o.created_at,
          u.email AS user_email,
          f.title AS formation_title
        FROM orders o
        LEFT JOIN users u ON o.userId = u.id
        LEFT JOIN formations f ON o.formationId = f.id
        ORDER BY o.created_at DESC`
    );

    res.json(orders);
  } catch (err) {
    console.error("Erreur chargement commandes admin:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
