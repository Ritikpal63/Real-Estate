const pool = require("../config/database");


class ContactModel{
    static async create(data) {
  const { name, email, message } = data;
  const [result] = await pool.query(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    [name, email, message]
  );
  return { id: result.insertId, name, email, message };
}
}
module.exports = ContactModel;
