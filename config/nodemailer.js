import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

//I am making this component reuseable by making it take 3 customizable arguments
const mailer = (mail, subject, text, firstName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: " patoctave99@gmail.com",
      pass: "kjksxvvyxtoldilv",
      // user: "bamssaiec@gmail.com",
      // pass: "wjmeqcqijmxtpfqm",
    },
  });

  const mailOptions = {
    from: "patoctave99@gmail.com",
    to: mail,
    subject: subject,
    html: `
    <div style="width: 100%; background-color: #CBD1D8; padding: 5rem 0">
    <div style="max-width: 700px; margin: 0 auto; background-color: #CBD1D8; margin: 0 auto">
    <div style="width: 100%; background-color: #3568FF; padding: 20px 0; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem">
    <a href="https://vote-verse.vercel.app" style='color: #fff; margin: 0 auto'; >Vote-Verse</a>


    </div>
    <div style="width: 100%; gap: 10px: padding: 30px 0; display: grid">
    <h1 style="font-size: 1.25rem; margin: 15px 20px">Dear ${
      firstName ? firstName : "User"
    }</h1>
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
