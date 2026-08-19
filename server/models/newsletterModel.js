import pool from "../config/db.js";
const { v4: uuidv4 } = require("uuid");


const NewsletterModel = {
  async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT * FROM newsletter_subscribers WHERE email = ? LIMIT 1`,
      [email]
    );

    return rows[0];
  },

  async create(email) {
    const id = uuidv4()

    const [result] = await pool.query(
      `
      INSERT INTO newsletter_subscribers
      (id, email, status)
      VALUES (?, ?, 'active')
      `,
      [id, email]
    );

    return result;
  },

  async subscribe(email) {
    const existing = await this.findByEmail(email);

    if (existing) {
      if (existing.status === "active") {
        return {
          alreadySubscribed: true,
          subscriber: existing,
        };
      }

      await pool.query(
        `
        UPDATE newsletter_subscribers
        SET status = 'active'
        WHERE email = ?
        `,
        [email]
      );

      return {
        reactivated: true,
      };
    }

    await this.create(email);

    return {
      created: true,
    };
  },
};

export default NewsletterModel;