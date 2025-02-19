module.exports = (firstName, lastName, email, phone, message, company = "Not provided") => {
  return `
    <div style="
      font-family: 'Arial', sans-serif;
      max-width: 600px;
      margin: auto;
      background: #1a1a2e;
      color: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    ">
      <div style="background: #0f3460; padding: 20px; text-align: center;">
        <h2 style="margin: 0; color: #fff;">📩 New Contact Message</h2>
      </div>
      <div style="padding: 20px;">
        <p><strong style="color: #e94560;">👤 Name:</strong> ${firstName} ${lastName}</p>
        <p><strong style="color: #e94560;">🏢 Company:</strong> ${company}</p>
        <p><strong style="color: #e94560;">📧 Email:</strong> <a href="mailto:${email}" style="color: #00adb5; text-decoration: none;">${email}</a></p>
        <p><strong style="color: #e94560;">📞 Phone:</strong> ${phone || "Not provided"}</p>
        
        <p style="margin-top: 20px;"><strong style="color: #e94560;">💬 Message:</strong></p>
        <blockquote style="
          background: #16213e;
          padding: 15px;
          border-left: 5px solid #e94560;
          font-style: italic;
        ">
          ${message}
        </blockquote>
      </div>
      <div style="background: #0f3460; padding: 10px; text-align: center; font-size: 14px;">
        <p style="margin: 0;">🔹 This message was sent from your website's contact form.</p>
      </div>
    </div>
  `;
};
