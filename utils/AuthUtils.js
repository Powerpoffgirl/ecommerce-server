const validator = require("validator");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key_here";
const nodemailer = require("nodemailer");


const cleanUpAndValidate = ({ name, email, username, password }) => {
  return new Promise((resolve, reject) => {
    if (!email || !password || !name || !username) {
      reject("Missing credentials");
    }

    if (typeof email !== "string") {
      reject("Invalid Email");
    }
    if (typeof username !== "string") {
      reject("Invalid Username");
    }
    if (typeof password !== "string") {
      reject("Invalid password");
    }

    if (username.length <= 2 || username.length > 50)
      reject("Username length should be 3-50");

    if (password.length <= 2 || password.length > 25)
      reject("Password length should be 3-25");

    if (!validator.isEmail(email)) {
      reject("Invalid Email format");
    }
    resolve();
  });
};
const generateJWTToken = (email) => {
  const JWT_TOKEN = jwt.sign(email, SECRET_KEY);
  return JWT_TOKEN;
};

const sendVerificationToken = ({ email, verificationToken }) => {
  // nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
      user: "email.jyotisingh13@gmail.com",
      pass: "qvlxipcwvaiumijp",
    },
  });

  const mailOptions = {
    from: "Library management app pvt. ltd.",
    to: email,
    ubject: "Email verification for Library management",
    html: `Click <a href="http://localhost:8000/api/${verificationToken}">Here!!</a>`,
  };

  transporter.sendMail(mailOptions, function (err, response) {
    if (err) {
      console.log(err);
    }
    console.log("Mail sent successfully");
  });
};
module.exports = {
  cleanUpAndValidate,
  generateJWTToken,
  sendVerificationToken,
};
