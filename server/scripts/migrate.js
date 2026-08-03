// scripts/migrate.js
const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

async function runMigration() {
  try {
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // mysql2 pool by default multiple statements ek saath allow nahi karta,
    // isliye ";" se split karke ek-ek statement run karenge
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      await pool.query(statement);
      console.log('✔ Executed:', statement.split('\n')[0].slice(0, 60) + '...');
    }

    console.log('\n✅ All tables created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  }
}

runMigration();