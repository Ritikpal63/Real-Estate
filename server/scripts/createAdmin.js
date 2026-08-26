const bcrypt = require("bcrypt");
const db = require("../config/database");

const createAdmin = async () => {
  try {



    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("Please set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
    }




    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Users table checked/created");




    const [existing] = await db.query(
      "SELECT id, email, role FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      console.log("✅ Admin user already exists");
      return;
    }




    const hashedPassword = await bcrypt.hash(password, 10);





    const [result] = await db.query(
      `
      INSERT INTO users
      (id, username, name, email, password, role)
      VALUES (UUID(), ?, ?, ?, ?, ?)
      `,
      ["admin", "Admin User", email, hashedPassword, "admin"]
    );

    console.log("✅ Admin created successfully");
    console.log("Admin ID:", result.insertId || "UUID generated");
    console.log("Admin Email:", email);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};


createAdmin();

module.exports = createAdmin;
