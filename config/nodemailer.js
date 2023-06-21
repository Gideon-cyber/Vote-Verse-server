import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//I am making this component reuseable by making it take 3 customizable arguments
const mailer = (mail, subject, text, firstName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: " patoctave99@gmail.com",
      pass: "kjksxvvyxtoldilv",
    },
  });

  const mailOptions = {
    from: "patoctave99@gmail.com",
    to: mail,
    subject: subject,
    html: `
    <div style="width: 100%; background-color: #59B5FF; padding: 5rem 0">
    <div style="max-width: 700px; margin: 0 auto; background-color: #EBF3FA; margin: 0 auto">
    <div style="width: 100%; background-color: #3568FF; padding: 20px 0; color: #fff">
    <a href="https://vote-verse.vercel.app" >Vote-Verse</a>


    </div>
    <div style="width: 100%; gap: 10px: padding: 30px 0; display: grid">
    <h1 style="font-size: 1.25rem; margin: 15px 20px">Dear ${firstName}</h1>
    <p style="font-size: .8rem; margin: 10px 30px">Thank you for choosing Vote-verse </p>

    <p style="font-size: .8rem; margin: 0 30px">Here is your OTP: ${text} </p>

    
    </div>
    </div>
    </div>`,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => console.log("mail sent successfully"))
    .catch((error) => console.log(error));
};

export default mailer;
