const { v4: uuidv4 } = require("uuid");
const pool = require("../config/database");

class BlogModel {
  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);
    return rows[0];
  }
  static async create(data) {
    const { title, content, imageUrl } = data;
    const id = uuidv4();
    const [result] = await pool.query(
      "INSERT INTO blogs (id, title, content, image, created_at) VALUES (?, ?, ?, ?, NOW())",
      [id, title, content, imageUrl],
    );
    return this.getById(id)
  }
  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM blogs");
    return rows;
  }
    static async delete(id) {
    const [result] = await pool.query("DELETE FROM blogs WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
    static async update(id, data) {
    const { title, content, imageUrl} = data;
    const [result] = await pool.query(
      "UPDATE blogs SET title = ?, content = ?, image = ? WHERE id = ?",
      [
        title,
        content,
        imageUrl,
        id,
      ],
    );
    return result.affectedRows > 0 ? this.getById(id) : null;
  }
  static async getCount() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM blogs");
    return rows[0].total;
  }
}
module.exports = BlogModel;
