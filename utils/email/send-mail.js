const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

module.exports = (mail, otp, username) => {
  const filePath = path.join(__dirname, '..', 'email/mail-template.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);

  const replacement = {
    username: username,
    otp: otp
  };

  const mailTemplate = template(replacement);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mymail@gmail.com",
      pass: "mypassword"
    }
  });

  const mailOptions = {
    from: "mymail@gmail.com",
    to: mail,
    subject: "Retrieve password",
    html: mailTemplate
  };

  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        resolve(`An OTP has been sent to your email, check in a minute time, if you still did not get a mail, check your spam.`)
      }
    });
  });
};
