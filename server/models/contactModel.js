const { v4: uuidv4 } = require("uuid");
const pool = require("../config/database");

class ContactModel {
  static async create(data) {
    const { name, email, message } = data;
    const id = uuidv4();
    const [result] = await pool.query(
      "INSERT INTO contacts (id, name, email, message) VALUES (?, ?, ?, ?)",
      [id, name, email, message],
    );
    return { id: result.id, name, email, message };
  }
  static async getCount() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM contacts");
    return rows[0].total;
  }
}
module.exports = ContactModel;
