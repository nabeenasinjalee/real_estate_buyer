const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'realestate.db');
const db = new sqlite3.Database(dbPath);

const initDB = () => {
  // Create users table with constraints
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'buyer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      CHECK (length(email) <= 100),
      CHECK (length(name) >= 2 AND length(name) <= 50)
    )
  `);

  // Create favourites table
  db.run(`
    CREATE TABLE IF NOT EXISTS favourites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      property_id INTEGER NOT NULL,
      property_title TEXT NOT NULL,
      property_price TEXT NOT NULL,
      property_location TEXT NOT NULL,
      property_image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, property_id)
    )
  `);

  console.log('Database initialized with validation constraints');
};

module.exports = { db, initDB };