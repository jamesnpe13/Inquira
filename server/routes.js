// Express
const express = require('express');
const router = express.Router();

// test route
router.get('/health', (req, res, next) => {
  const time = process.uptime();
  console.log(time);
  const timeConv = () => {
    if (time < 60) return Math.floor(time).toString().concat('s'); // seconds
    if (time >= 60)
      return Math.floor(time / 60)
        .toString()
        .concat('m'); // minutes
  };

  res.json({
    message: 'ok',
    uptime: timeConv(),
  });
});

module.exports = router;
