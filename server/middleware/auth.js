const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET || "Gaurav@123");

    req.user = decoded.user;
    next();
    
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
