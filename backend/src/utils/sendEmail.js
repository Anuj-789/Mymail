const transporter = require("../config/mail");

const sendEmail = async (options) => {
  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,

    to: options.email,

    subject: options.subject,

    html: options.message,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
};

module.exports = sendEmail;
