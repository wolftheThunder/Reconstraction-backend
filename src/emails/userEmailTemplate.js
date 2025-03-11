module.exports = (firstName) => {
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
      <!-- Header Section -->
      <div style="background: #004080; padding: 20px; text-align: center;">
        <h2 style="margin: 0; color: #fff;">✅ Message Received</h2>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 25px; line-height: 1.6;">
        <p style="font-size: 18px;">Hello <strong style="color: #004080;">${firstName}</strong>,</p>
        <p>Thank you for contacting <strong>Jandrnw Construction</strong>! 🏗️</p>
        <p>We have received your message, and our team is currently reviewing your request. One of our representatives will reach out to you soon.</p>
        
        <div style="
          background: #f9f9f9;
          padding: 15px;
          margin-top: 20px;
          border-radius: 8px;
          border-left: 4px solid #0073e6;
          text-align: center;
        ">
          <p style="margin: 0; color: #0073e6; font-weight: bold;">Need urgent assistance?</p>
          <p style="margin: 0;">
            📧 <a href="mailto:Jandrnwconstruction@gmail.com" style="color: #004080; text-decoration: none; font-weight: bold;">Contact Support</a>
          </p>
        </div>
      </div>

      <!-- Footer Section -->
      <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 14px; color: #666;">
        <p style="margin: 0;">Best regards, <br> <strong>Jandrnw Construction Team</strong></p>
      </div>
    </div>
  `;
};
