import pool from "../config/db.js";

export class User {
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      return rows;
    } catch (error) {
      console.error("Erreur dans findByEmail:", error);
      throw error;
    }
  }


  static async create({ firstName, lastName, email, password, role, isVerified = 0 }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO users (firstName, lastName, email, password, role, isVerified)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, email, password, role, isVerified]
      );
      return result.insertId;
    } catch (error) {
      console.error("Erreur dans create:", error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      console.error("Erreur dans findById:", error);
      throw error;
    }
  }

  static async verifyEmail(email) {
    try {
      const [result] = await pool.query(
        "UPDATE users SET isVerified = 1 WHERE email = ?",
        [email]
      );
      return result.affectedRows > 0; 
    } catch (error) {
      console.error("Erreur dans verifyEmail:", error);
      throw error;
    }
  }
}
