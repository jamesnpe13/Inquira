// Express
const express = require('express');
const router = express.Router();

// test route
router.get('/health', (req, res, next) => {
  res.json({ message: 'ok' });
});

module.exports = router;
