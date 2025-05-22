const jwt = require('jsonwebtoken');

const SECRET = 'yourSecretKey';

module.exports = function (req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token.split(" ")[1], SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};

module.exports.SECRET = SECRET;
