const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Missing or malformed token:", authHeader);
    return res.status(401).json({ message: "Unauthorized - No Token" });
  }

  const token = authHeader.split(" ")[1];

  console.log("📦 Token Received:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(" Token Decoded:", decoded); 

    req.admin = decoded;
    next();
  } catch (error) {
    console.log("⚠️ Token verification failed:", error.message); 
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
