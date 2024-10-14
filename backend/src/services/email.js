const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, messageObj) => {
    const email_user = process.env.EMAIL_USER;
    const email_pass = process.env.EMAIL_PASS;
  
    // Create HTML for messages
    const messagesHtml = messageObj.msg.map(msg => `<div style="margin-bottom: 10px; font-size: 16px;">${msg}</div>`).join('');
  
    // Create HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Hello!</h2>
        ${messagesHtml}
        ${messageObj.link ? 
          `<div style="text-align: center; margin-top: 20px;">
            <a href="${messageObj.link}" style="padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Click Here</a>
          </div>` 
          : ''
        }
        <p style="font-size: 16px; margin-top: 20px; text-align: center;">Best Regards,<br>Thanh To</p>
      </div>
    `;
  
    const mailOptions = {
      from: email_user,
      to,
      subject,
      html: htmlContent,
    };
  
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: email_user,
        pass: email_pass,
      },
    });
  
    try {
      await transporter.sendMail(mailOptions);
      return { success: true, message: "Email sent successfully!" };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error: "Failed to send email" };
    }
  };

module.exports = { sendEmail };
