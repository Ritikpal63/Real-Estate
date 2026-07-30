const pool = require('../config/database')
const {v4: uuidv4} = require('uuid')

class PropertyModel{
    static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM properties WHERE id = ?", [id]);
    return rows[0];
  }


   static async createProperty(
  title,
  location,
  type,
  amenities,
  size,
  year,
  bedroom,
  bathroom,
  description,
  image,
  price
) {
  const id = uuidv4();

  await pool.query(
    `INSERT INTO properties
      (id, title, location, type, amenities, size, year, bedroom, bathroom, description, image, price, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [
      id,
      title,
      location,
      type,
      amenities,
      size,
      year,
      bedroom,
      bathroom,
      description,
      image,
      price,
    ]
  );

  return this.getById(id);
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