const express = require("express");
const AuthRouter = express.Router();
const { cleanUpAndValidate, sendVerificationToken, generateJWTToken } = require("../utils/AuthUtils");
const User = require("../Models/UserModel");
const { isAuth } = require("../Middlewares/AuthMiddleware");
// const { rateLimiting } = require("./middlewares/rateLimiting");


//  /auth/register
AuthRouter.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, username, email, password } = req.body;
  
  await cleanUpAndValidate({ name, email, password, username })
    .then(async () => {
      try {
        await User.verifyUsernameAndEmailExits({ email, username });
      } catch (error) {
        return res.send({
          status: 400,
          message: "Error Occurred",
          error: error,
        });
      }

      //create an obj for user class
      const userObj = new User({
        name,
        email,
        password,
        username,
      });

      try {
        const userDb = await userObj.registerUser();
        console.log(userDb);
        const verificationToken = generateJWTToken(email);
        console.log(verificationToken);
        // send mai function
        sendVerificationToken({ email, verificationToken });
        return res.send({
          status: 200,
          message: "Registration successfull, Link has been sent to your mail id. Please verify before login.",
          data: {
            user: userDb,
            token: verificationToken
          }
        });
      } catch (error) {
        console.error("Registration Error:", error); // Add this line to log the error
        return res.send({
          status: 500,
          message: "Database error",
          error: error,
        });
      }
    })
    .catch((err) => {
      return res.send({
        status: 400,
        message: "Data Invalid",
        error: err,
      });
    });
});


AuthRouter.post("/login", async (req, res) => {
  console.log("LOGIN CREDENTIALS", req.body)
  const { email, password } = req.body;

  if (!email || !password)
    return res.send({
      status: 400,
      message: "Missing Credentials",
    });

  try {
    const userDb = await User.loginUser({ email, password });
    const authToken = generateJWTToken(email);

    //session bases authentication
    req.session.isAuth = true;
    req.session.user = {
      username: userDb.username,
      email: userDb.email,
      userId: userDb._id,
    };

    return res.send({
      status: 200,
      message: "Login Successfully",
      data:{
        user: userDb,
        token: authToken,
      } 
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Error Occured",
      error: error,
    });
  }
});

AuthRouter.post("/logout", isAuth, (req, res) => {
  const user = req.session.user;

  req.session.destroy((err) => {
    if (err) {
      return res.send({
        status: 400,
        message: "Logout unsuccessfull",
        error: err,
      });
    }

    return res.send({
      status: 200,
      message: "Logout Sucessfully",
      data: user,
    });
  });
});

module.exports = AuthRouter;

