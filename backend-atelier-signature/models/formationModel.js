import pool from "../config/db.js";

export const Formation = {
  
  findAll: async () => {
    const [rows] = await pool.execute(
      "SELECT * FROM formations ORDER BY date_creation DESC"
    );
    return rows;
  },

  
  findById: async (id) => {
    const [rows] = await pool.execute(
      "SELECT * FROM formations WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  
  create: async ({ title, description, price, category }) => {
    const sql = `INSERT INTO formations (title, description, price, category, detailed_formation) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [title, description, price, category, detailed_formation]);
    return { id: result.insertId, title, description, price, category, detailed_formation };
  },

  
  remove: async (id) => {
    const [result] = await pool.execute(`DELETE FROM formations WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  },
};



