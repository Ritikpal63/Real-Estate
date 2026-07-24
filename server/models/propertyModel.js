const pool = require('../config/database')

class PropertyModel{
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