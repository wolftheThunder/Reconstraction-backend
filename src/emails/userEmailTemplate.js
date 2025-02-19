module.exports = (firstName) => {
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
          <h2 style="margin: 0; color: #fff;">✅ Message Received</h2>
        </div>
        
        <div style="padding: 20px;">
          <p style="font-size: 18px;">Hi <strong style="color: #00adb5;">${firstName}</strong>,</p>
          <p>Thank you for reaching out to us! We have successfully received your message. 🎉</p>
          <p>Our team is reviewing your request and will respond as soon as possible.</p>
  
          <div style="
            background: #16213e;
            padding: 15px;
            margin-top: 20px;
            border-radius: 8px;
            text-align: center;
          ">
            <p style="margin: 0; color: #e94560;">Need urgent assistance?</p>
            <p style="margin: 0;"><a href="mailto:support@yourcompany.com" style="color: #00adb5; text-decoration: none; font-weight: bold;">📧 Contact Support</a></p>
          </div>
        </div>
  
        <div style="background: #0f3460; padding: 10px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">Best regards, <br> <strong>🚀 Support Team</strong></p>
        </div>
      </div>
    `;
  };
  