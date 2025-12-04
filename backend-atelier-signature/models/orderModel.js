// models/orderModel.js
import pool from "../config/db.js";

export class Order {
  // Liste des commandes avec filtre optionnel
  static async findAll({ dateFrom, dateTo, formationId }) {
    let query = `
      SELECT c.id, c.amount, c.stripe_session_id, c.created_at,
             f.title AS formation_title,
             u.email AS user_email, u.firstName, u.lastName
      FROM commandes c
      LEFT JOIN formations f ON c.formation_id = f.id
      LEFT JOIN users u ON c.user_id = u.id
      WHERE 1 = 1
    `;
    const params = [];

    if (dateFrom) {
      query += " AND c.created_at >= ? ";
      params.push(dateFrom);
    }

    if (dateTo) {
      query += " AND c.created_at <= ? ";
      params.push(dateTo);
    }

    if (formationId) {
      query += " AND c.formation_id = ? ";
      params.push(formationId);
    }

    query += " ORDER BY c.created_at DESC";

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async create({ userId, formationId, amount, stripeSessionId }) {
    const [result] = await pool.query(
      `INSERT INTO commandes (user_id, formation_id, amount, stripe_session_id, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [userId, formationId, amount, stripeSessionId]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [rows] = await pool.query(
      `
      SELECT c.*, f.title AS formation_title
      FROM commandes c
      LEFT JOIN formations f ON c.formation_id = f.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
      `,
      [userId]
    );
    return rows;
  }
}
