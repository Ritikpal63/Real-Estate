// backend/scripts/createAdmin.js
const bcrypt = require('bcrypt');
const db = require('../config/database');

const createAdmin = async () => {
  try {
    // Check if admin already exists
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

// Don't forget to close the connection
process.on('exit', () => {
  db.end();
});