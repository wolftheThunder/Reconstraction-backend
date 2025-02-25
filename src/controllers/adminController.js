const { Admin } = require("../models");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
require("dotenv").config(); 

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      console.log("❌ Admin not found:", email);
      return res.status(401).json({ message: "Invalid Credentials" });
    }


    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      console.log("❌ Incorrect Password!");
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("⚠️ JWT_SECRET is missing in the environment variables!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      admin: { id: admin.id, email: admin.email },
    });

  } catch (error) {
    console.error("⚠️ Server Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
