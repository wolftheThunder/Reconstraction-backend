module.exports = (firstName, lastName, email, phone, message, company = "Not provided") => {
  return `
    <div style="
      font-family: 'Arial', sans-serif;
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      color: #333;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #ddd;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    ">
      <!-- Header -->
      <div style="background: #004080; padding: 20px; text-align: center;">
        <h2 style="margin: 0; color: #fff; font-size: 20px;">📩 New Contact Message</h2>
      </div>

      <!-- Main Content -->
      <div style="padding: 25px;">
        <p><strong style="color: #004080;">👤 Name:</strong> ${firstName} ${lastName}</p>
        <p><strong style="color: #004080;">🏢 Company:</strong> ${company || "Jandrnw Construction"}</p>
        <p><strong style="color: #004080;">📧 Email:</strong> 
          <a href="mailto:${email}" style="color: #0073e6; text-decoration: none; font-weight: bold;">${email}</a>
        </p>
        <p><strong style="color: #004080;">📞 Phone:</strong> ${phone || "Not provided"}</p>
        
        <p style="margin-top: 20px;"><strong style="color: #004080;">💬 Message:</strong></p>
        <div style="
          background: #f9f9f9;
          padding: 15px;
          border-left: 4px solid #0073e6;
          font-style: italic;
          color: #555;
        ">
          ${message}
        </div>
      </div>

      <!-- Footer -->
      <div style="
        background: #f1f1f1;
        padding: 15px;
        text-align: center;
        font-size: 14px;
        color: #666;
      ">
        <p style="margin: 0;">📍 This message was sent from the Jandrnw Construction website contact form.</p>
      </div>
    </div>
  `;
};
