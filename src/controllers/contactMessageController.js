const ContactMessage = require("../models/ContactMessage");
const nodemailer = require("nodemailer");
const adminEmailTemplate = require("../emails/adminEmailTemplate");
const userEmailTemplate = require("../emails/userEmailTemplate");
require("dotenv").config();

const createContactMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, agreed } = req.body;
    const company = req.body.company || "Not provided"; // ✅ Ensure default value

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Message Received",
      html: adminEmailTemplate(firstName, lastName, email, phone, message, company), // ✅ Fix order
    });

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

module.exports = { createContactMessage };
