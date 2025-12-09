// models/orderModel.js
import pool from "../config/db.js";

export class Order {
  // 🔎 Liste de toutes les commandes (pour le dashboard admin)
  static async findAll() {
    const [rows] = await pool.query(
      `
      SELECT 
        c.id,
        c.date_creation,
        c.status,
        c.pdf_file,
        u.email AS user_email,
        f.title AS formation_title
      FROM commandes c
      LEFT JOIN users u ON u.id = c.user_id
      LEFT JOIN formations f ON f.id = c.formation_id
      ORDER BY c.date_creation DESC
      `
    );

    return rows;
  }

  // 🧾 Création d'une commande (appelée depuis le webhook Stripe)
  static async create({ userId, formationId, stripeSessionId, pdfFile }) {
    const [result] = await pool.query(
      `
      INSERT INTO commandes (user_id, formation_id, stripe_payment_id, pdf_file, status, date_creation)
      VALUES (?, ?, ?, ?, 'paid', NOW())
      `,
      [userId, formationId, stripeSessionId, pdfFile]
    );

    return result.insertId;
  }

  // (optionnel) Historique des commandes pour un user
  static async findByUserId(userId) {
    const [rows] = await pool.query(
      `
      SELECT 
        c.*,
        f.title AS formation_title
      FROM commandes c
      LEFT JOIN formations f ON f.id = c.formation_id
      WHERE c.user_id = ?
      ORDER BY c.date_creation DESC
      `,
      [userId]
    );

    return rows;
  }
}
