const pool = require('../config/database')

class PropertyModel{
  static async getCount() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM properties");
    return rows[0].total;
  }
}
module.exports = PropertyModel