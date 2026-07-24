// models/newsModel.js
const pool = require("../config/database");

class NewsModel {
  // Get all news
  static async getAll(limit = 50, offset = 0) {
    const [rows] = await pool.query(
      "SELECT * FROM news ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset],
    );
    return rows;
  }

  // Get single news by ID
  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM news WHERE id = ?", [id]);
    return rows[0];
  }

  // Create news
  static async create(data) {
    const { title, content, summary, category, image, author } = data;
    const [result] = await pool.query(
      "INSERT INTO news (title, content, summary, category, image, author) VALUES (?, ?, ?, ?, ?, ?)",
      [
        title,
        content,
        summary || null,
        category || "General",
        image || null,
        author || "Admin",
      ],
    );
    return this.getById(result.insertId);
  }

  // Update news
  static async update(id, data) {
    const { title, content, summary, category, image, author } = data;
    const [result] = await pool.query(
      "UPDATE news SET title = ?, content = ?, summary = ?, category = ?, image = ?, author = ? WHERE id = ?",
      [
        title,
        content,
        summary || null,
        category || "General",
        image || null,
        author || "Admin",
        id,
      ],
    );
    return result.affectedRows > 0 ? this.getById(id) : null;
  }

  // Delete news
  static async delete(id) {
    const [result] = await pool.query("DELETE FROM news WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  // Get news by category
  static async getByCategory(category, limit = 20) {
    const [rows] = await pool.query(
      "SELECT * FROM news WHERE category = ? ORDER BY created_at DESC LIMIT ?",
      [category, limit],
    );
    return rows;
  }

  // Search news
  static async search(keyword) {
    const [rows] = await pool.query(
      `SELECT * FROM news 
       WHERE title LIKE ? OR content LIKE ? OR summary LIKE ? 
       ORDER BY created_at DESC`,
      [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`],
    );
    return rows;
  }

  // Get latest news
  static async getLatest(limit = 5) {
    const [rows] = await pool.query(
      "SELECT * FROM news ORDER BY created_at DESC LIMIT ?",
      [limit],
    );
    return rows;
  }

  // Get total count
  static async getCount() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM news");
    return rows[0].total;
  }
}

module.exports = NewsModel;
