const { v4: uuidv4 } = require("uuid");
const pool = require("../config/database");


class GalleryModel {
  static async getAll() {
    const [rows] = await pool.query(
      "SELECT * FROM gallery ORDER BY created_at DESC"
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM gallery WHERE id = ?", [id]);
    return rows[0];
  }

  static async getByCategory(category) {
    const [rows] = await pool.query(
      "SELECT * FROM gallery WHERE category = ? ORDER BY created_at DESC",
      [category]
    );
    return rows;
  }

  static async create(data) {
    const { title, category, image, description } = data;
    const id = uuidv4();
    await pool.query(
      "INSERT INTO gallery (id, title, category, image, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [id, title, category || "bedroom", image, description || null]
    );
    return this.getById(id);
  }

  static async update(id, data) {
    const { title, category, image, description } = data;
    await pool.query(
      "UPDATE gallery SET title = ?, category = ?, image = ?, description = ? WHERE id = ?",
      [title, category || "bedroom", image, description || null, id]
    );
    return this.getById(id);
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM gallery WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = GalleryModel;