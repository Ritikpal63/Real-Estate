
const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

class NewsModel {

  static async getAll(limit = 50, offset = 0) {
    const [rows] = await pool.query(
      "SELECT * FROM news ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );
    return rows;
  }


  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM news WHERE id = ?", [id]);
    return rows[0];
  }


  static async create(data) {
    const id = uuidv4();
    const { title, content, summary, category, image, author } = data;
    const [result] = await pool.query(
      "INSERT INTO news (id, title, content, summary, category, image, author, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
      [
      id,
      title,
      content,
      summary || null,
      category || "General",
      image || null,
      author || "Admin"]

    );
    return this.getById(result.insertId);
  }


  static async update(id, data) {
    const { title, content, summary, category, image, author } = data;

    await pool.query(
      `UPDATE news
     SET
       title=?,
       content=?,
       summary=?,
       category=?,
       image=?,
       author=?
     WHERE id=?`,
      [
      title,
      content,
      summary || null,
      category || "General",
      image,
      author || "Admin",
      id]

    );

    return this.getById(id);
  }


  static async delete(id) {
    const [result] = await pool.query("DELETE FROM news WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }


  static async getByCategory(category, limit = 20) {
    const [rows] = await pool.query(
      "SELECT * FROM news WHERE category = ? ORDER BY created_at DESC LIMIT ?",
      [category, limit]
    );
    return rows;
  }


  static async search(keyword) {
    const [rows] = await pool.query(
      `SELECT * FROM news
       WHERE title LIKE ? OR content LIKE ? OR summary LIKE ?
       ORDER BY created_at DESC`,
      [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );
    return rows;
  }


  static async getLatest(limit = 5) {
    const [rows] = await pool.query(
      "SELECT * FROM news ORDER BY created_at DESC LIMIT ?",
      [limit]
    );
    return rows;
  }


  static async getCount() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM news");
    return rows[0].total;
  }
}

module.exports = NewsModel;
