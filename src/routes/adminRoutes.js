const express = require("express");
const { adminLogin } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", adminLogin);

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin!", admin: req.admin });
});

module.exports = router;
