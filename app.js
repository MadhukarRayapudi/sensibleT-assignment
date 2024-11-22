const express = require('express');
const bodyParser = require('body-parser');
const transactionsRoutes = require('./routes/transactions');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use(transactionsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
