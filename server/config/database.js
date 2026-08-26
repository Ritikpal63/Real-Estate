
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 4000),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 3,
  queueLimit: 0,

  ssl: {
    minVersion: "TLSv1.2"

  }
});

pool.
getConnection().
then((connection) => {
  console.log("✅ TiDB Cloud connected successfully");
  connection.release();
}).
catch((error) => {
  console.error("❌ TiDB Cloud connection failed:");
  console.error(error.message);
});

module.exports = pool;
