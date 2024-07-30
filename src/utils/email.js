import nodemailer from "nodemailer";

export const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NM_USER,
      pass: process.env.NM_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Job Search App 😪" <${process.env.NM_USER}>`, // sender address
    to: email, // list of receivers
    subject: "OTP Code", // Subject line
    text: `Your OTP code is: ${otp}`, // plain text body
    html: `Your OTP code is: <b>${otp}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
