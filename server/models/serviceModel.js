const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

class ServiceModel {

  static async getAll(limit = 4, offset = 0) {
    const [rows] = await pool.query(
      `
      SELECT *
      FROM services
      ORDER BY display_order ASC, created_at DESC
      LIMIT ? OFFSET ?
      `,
      [Number(limit), Number(offset)]
    );

    return rows;
  }


  static async getAllServices() {
    const [rows] = await pool.query(`
      SELECT *
      FROM services
      ORDER BY display_order ASC, created_at DESC
    `);

    return rows;
  }


  static async getById(id) {
    const [rows] = await pool.query(
      `
      SELECT *
      FROM services
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    return rows[0];
  }

  static async create(service) {
    const id = uuidv4();

    const {
      title,
      slug,
      description,
      icon,
      status = "active",
      display_order = 0
    } = service;

    await pool.query(
      `
      INSERT INTO services
      (
        id,
        title,
        slug,
        description,
        icon,
        status,
        display_order,
        created_at
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, NOW())
      `,
      [id, title, slug, description, icon, status, display_order]
    );

    return await this.getById(id);
  }

  static async update(id, service) {
    const { title, slug, description, icon, status, display_order } = service;

    const [result] = await pool.query(
      `
      UPDATE services
      SET
        title = ?,
        slug = ?,
        description = ?,
        icon = ?,
        status = ?,
        display_order = ?
      WHERE id = ?
      `,
      [title, slug, description, icon, status, display_order, id]
    );

    return result;
  }


  static async delete(id) {
    const [result] = await pool.query(
      `
      DELETE FROM services
      WHERE id = ?
      `,
      [id]
    );

    return result;
  }
  static async getCount() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM services");
    return rows[0].total;
  }
}

module.exports = ServiceModel;
