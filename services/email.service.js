const nodeMailer = require("nodemailer");
const auth = require("../middleware/auth.middleware");

const sendRegisterEmail = async (email, subject, name) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    secure: true,
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SEND_GRID_API_KEY,
    },
  });

  const mailOptions = {
    from: `Career Waves Institute <${process.env.EMAIL}>`,
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #14131c; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
          <img src="https://res.cloudinary.com/ansalpandey/image/upload/v1730900021/zvmxuyfdvddc8tlvo6z8.png" alt="Career Waves Institute Logo" style="width: 80px; height: auto;">
        </div>
        <div style="padding: 20px;">
          <h1 style="color: #14131c; text-align: center;">Welcome to Career Waves Institute!</h1>
          <p>Dear ${name},</p>
          <p>We’re thrilled to have you on board! At Career Waves Institute, we're dedicated to helping you reach your goals and unlock new opportunities. Here's everything you need to get started:</p>
  
          <h2 style="color: #14131c;">What’s Next?</h2>
          <ul>
            <li>Explore our courses and programs tailored to help you succeed.</li>
            <li>Get in touch with our support team if you have any questions.</li>
            <li>Join our community of learners and start your journey today!</li>
          </ul>
  
          <p style="text-align: center;">
            <a href="https://careerwaveseducation.in/" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #14131c; text-decoration: none; border-radius: 5px; margin-top: 20px;">
              Get Started
            </a>
          </p>
  
          <p>If you have any questions or need support, feel free to <a href="mailto:support@careerwaveseducation.in" style="color: #14131c;">contact us</a>.</p>
  
          <p>Thank you for joining Career Waves Institute. We look forward to seeing you achieve great things!</p>
  
          <p>Warm regards,<br> The Career Waves Institute Team</p>
        </div>
        <div style="background-color: #f9f9f9; padding: 10px; text-align: center; color: #777; font-size: 12px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
          <p>&copy; ${new Date().getFullYear()} Career Waves Institute. All rights reserved.</p>
          <p>Address:- Building No - E178, 1st Floor Sector 63, Electronic City, Noida Uttar Pradesh-201309</p>
        </div>
      </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
  return;
};

module.exports = { sendRegisterEmail};
