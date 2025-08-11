const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (accessToken == null) return res.json({ error: 'No token provided' });

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next(err);

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
