import pool from "../config/db.js";

export class User {
  // Trouver un utilisateur par email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      return rows; // tableau (0 ou 1 élément)
    } catch (error) {
      console.error("Erreur dans findByEmail:", error);
      throw error;
    }
  }

  // Créer un nouvel utilisateur
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

  // Trouver un utilisateur par ID
  static async findById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      console.error("Erreur dans findById:", error);
      throw error;
    }
  }

  // Marquer un utilisateur comme vérifié
  static async verifyEmail(email) {
    try {
      const [result] = await pool.query(
        "UPDATE users SET isVerified = 1 WHERE email = ?",
        [email]
      );
      return result.affectedRows > 0; // true si au moins 1 ligne modifiée
    } catch (error) {
      console.error("Erreur dans verifyEmail:", error);
      throw error;
    }
  }
}
