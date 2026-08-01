const { v4: uuidv4 } = require("uuid");
const pool = require("../config/database");

class TeamModel {
  static async getAllTeam(limit, offset) {
    const [rows] = await pool.query("SELECT * FROM team ORDER BY created_at DESC  LIMIT ? OFFSET ?", [limit, offset]);
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM team WHERE id = ?", [id]);
    return rows[0];
  }

  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM team");
    return rows;
  }

  static async add(name, designation, email, phone, facebook, instagram, twitter, about, image) {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO team
      (id, name, designation, email, phone, facebook, instagram, twitter, about, image, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [id, name, designation, email, phone, facebook, instagram, twitter, about, image],
    );
    return this.getById(id); // ✅ full row back, not undefined result.id
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM team WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}
module.exports = TeamModel;