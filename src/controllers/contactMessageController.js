const ContactMessage = require("../models/ContactMessage");
const nodemailer = require("nodemailer");
const adminEmailTemplate = require("../emails/adminEmailTemplate");
const userEmailTemplate = require("../emails/userEmailTemplate");
require("dotenv").config();

const createContactMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, agreed } = req.body;
    const company = req.body.company || "Not provided";

    if (!firstName || !lastName || !email || !message || agreed === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = await ContactMessage.create({
      firstName,
      lastName,
      company,
      email,
      phone,
      message,
      agreed,
    });

    // Configure Nodemailer with Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // smtp.hostinger.com
      port: process.env.EMAIL_PORT || 587, // 587 for TLS, 465 for SSL
      secure: process.env.EMAIL_SECURE === "true", // Use SSL if true
      auth: {
        user: process.env.ADMIN_EMAIL, // Your Hostinger email
        pass: process.env.ADMIN_EMAIL_PASSWORD, // Your App Password
      },
    });

    // Send email to admin
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL, // Admin's email
      subject: "New Contact Message Received",
      html: adminEmailTemplate(firstName, lastName, email, phone, message, company),
    });

    // Send confirmation email to the user
    await transporter.sendMail({
      from: `"Support Team" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "We've Received Your Message",
      html: userEmailTemplate(firstName),
    });

    return res.status(201).json({
      message: "Contact message submitted successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
    });
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
};
