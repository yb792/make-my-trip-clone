const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      console.log("User is not an admin");
      return res.status(403).json({ message: 'Forbidden - Admins only' });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    console.log("Invalid or expired token");
    res.status(403).json({ message: 'Forbidden - Invalid or expired token' });
  }
};

module.exports = adminAuth;
