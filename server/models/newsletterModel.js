const { v4: uuidv4 } = require("uuid");
const pool = require("../config/database");

const findSubscriberByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT *
     FROM newsletter_subscribers
     WHERE email = ?
     LIMIT 1`,
    [email]
  );

  return rows[0];
};

const createSubscriber = async (email) => {
  const id = uuidv4();

  const [result] = await pool.query(
    `INSERT INTO newsletter_subscribers
     (id, email, status)
     VALUES (?, ?, 'active')`,
    [id, email]
  );

  return result;
};

const reactivateSubscriber = async (email) => {
  const [result] = await pool.query(
    `UPDATE newsletter_subscribers
     SET status = 'active'
     WHERE email = ?`,
    [email]
  );

  return result;
};
module.exports = {
  findSubscriberByEmail,
  createSubscriber,
  reactivateSubscriber
};
