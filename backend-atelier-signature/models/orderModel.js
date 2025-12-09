import pool from "../config/db.js";

export class Order {
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT c.id, c.montant, c.stripe_payment_id, c.date_creation,
             f.title AS formation_title,
             u.email AS user_email
      FROM commandes c
      LEFT JOIN formations f ON c.formation_id = f.id
      LEFT JOIN users u ON c.user_id = u.id
      ORDER BY c.date_creation DESC
    `);
    return rows;
  }

  static async create({ userId, formationId, amount, stripeSessionId }) {
    const [result] = await pool.query(
      `INSERT INTO commandes 
        (user_id, formation_id, montant, stripe_payment_id, date_creation)
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
      ORDER BY c.date_creation DESC
      `,
      [userId]
    );
    return rows;
  }
}
