const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./transactions.db');

// Initialize the database with the Transaction table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      transaction_type TEXT CHECK(transaction_type IN ('DEPOSIT', 'WITHDRAWAL')) NOT NULL,
      user_id INTEGER NOT NULL,
      status TEXT CHECK(status IN ('PENDING', 'COMPLETED', 'FAILED')) DEFAULT 'PENDING',
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
