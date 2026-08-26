const pool = require("../config/database");

const { randomUUID: uuidv4 } = require("crypto");

class ServiceQueryModel {
  static async create({
    serviceId,
    serviceTitle,
    name,
    email,
    contact,
    message
  }) {
    const id = uuidv4();

    await pool.query(
      `
      INSERT INTO service_queries
      (
        id,
        service_id,
        service_title,
        name,
        email,
        contact,
        message,
        email_status,
        created_at
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
      `,
      [id, serviceId, serviceTitle, name, email, contact, message]
    );

    return this.getById(id);
  }

  static async getById(id) {
    const [rows] = await pool.query(
      `
        SELECT *
        FROM service_queries
        WHERE id = ?
        LIMIT 1
        `,
      [id]
    );

    return rows[0];
  }

  static async updateEmailStatus(id, status) {
    await pool.query(
      `
      UPDATE service_queries
      SET email_status = ?
      WHERE id = ?
      `,
      [status, id]
    );
  }

  static async getAll() {
    const [rows] = await pool.query(`
        SELECT *
        FROM service_queries
        ORDER BY created_at DESC
      `);

    return rows;
  }
}

module.exports = ServiceQueryModel;
