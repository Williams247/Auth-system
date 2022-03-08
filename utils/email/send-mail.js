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
      user: "email address",
      pass: "password to your email"
    }
  });

  const mailOptions = {
    from: "sender's mail",
    to: mail,
    subject: "Retrieve password",
    html: mailTemplate
  };

  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        resolve(`An OTP has been sent to ""${mail}"", please check in a minute time.`)
      }
    });
  });
};