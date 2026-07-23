const pool = require("../config/database");

class ContactModel {
  static async create(data) {
    const { name, email, message } = data;
    const [result] = await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message],
    );
    return { id: result.insertId, name, email, message };
  }
  static async getCount() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM contacts");
    return rows[0].total;
  }
}
module.exports = ContactModel;
