const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Create a new transaction
router.post('/api/transactions', (req, res) => {
  const { amount, transaction_type, user_id } = req.body;
  const query = `INSERT INTO transactions (amount, transaction_type, user_id) VALUES (?, ?, ?)`;

  db.run(query, [amount, transaction_type, user_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    db.get(`SELECT * FROM transactions WHERE id = ?`, [this.lastID], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(row);
    });
  });
});

// Retrieve all transactions for a user
router.get('/api/transactions', (req, res) => {
  const { user_id } = req.query;
  const query = `SELECT * FROM transactions WHERE user_id = ?`;

  db.all(query, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ transactions: rows });
  });
});

// Retrieve a specific transaction by ID
router.get('/api/transactions/:transaction_id', (req, res) => {
  const { transaction_id } = req.params;
  const query = `SELECT * FROM transactions WHERE id = ?`;

  db.get(query, [transaction_id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Transaction not found' });
    res.json(row);
  });
});

// Update the status of a transaction
router.put('/api/transactions/:transaction_id', (req, res) => {
  const { transaction_id } = req.params;
  const { status } = req.body;
  const query = `UPDATE transactions SET status = ? WHERE id = ?`;

  db.run(query, [status, transaction_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    db.get(`SELECT * FROM transactions WHERE id = ?`, [transaction_id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Transaction not found' });
      res.json(row);
    });
  });
});

module.exports = router;
