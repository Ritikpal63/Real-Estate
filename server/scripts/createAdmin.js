// backend/scripts/createAdmin.js
const bcrypt = require('bcrypt');
const db = require('../config/database');

const createAdmin = async () => {
  try {
    // Check if admin already exists
    await db.query(
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );
    const [existing] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      ['admin@realestate.local']
    );
    
    if (existing.length > 0) {
      console.log('✅ Admin user already exists');
      return;
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const [result] = await db.query(
      `INSERT INTO users (username, name, email, password, role, created_at) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      ['admin', 'Admin User', 'admin@realestate.local', hashedPassword, 'admin']
    );
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@realestate.local');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  }
};

// Run the function
createAdmin();
module.exports = createAdmin;

// Don't forget to close the connection
process.on('exit', () => {
  db.end();
});