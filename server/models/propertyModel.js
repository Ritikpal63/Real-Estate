const pool = require('../config/database')

class PropertyModel{
    static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM properties WHERE id = ?", [id]);
    return rows[0];
  }


    static async createProperty(data) {
    const { title, content, summary, category, image, author } = data;
    const [result] = await pool.query(
     `INSERT INTO properties
        (title, location, type, amenities, size, year, bedroom, bathroom, description, image, price, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        title,
        location,
        type,
        amenities || null,
        size || null,
        year || null,
        bedroom || 0,
        bathroom || 0,
        description || null,
        image,
        price || 0,
      ]
    );
    // return this.getById(result.insertId);
  }


  static async getCount() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM properties");
    return rows[0].total;
  }
  static async getAllProperty() {
    const [rows] = await pool.query("SELECT *  FROM properties");
    return rows;
  }
}
module.exports = PropertyModel