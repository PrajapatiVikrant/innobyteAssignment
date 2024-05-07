require("../Config/db");
const authSchema = require("../Model/AuthSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailSend = require('../emailOperation/sendEmail')



const Auth = {
  SignUp: async (req, res) => {
    const { name, email, password } = req.query;
    try {
      //first we check user already exist or not
      const data = await authSchema.findOne({ email: email }); //find user with request email
      const token = jwt.sign({ email: email }, process.env.JWT_SCERET_KEY, {
        expiresIn: "1h",
      }); //genrate token

      if (data) {
        //if user already exist then we send message already exist and token to login in site
        res.json({
          message: "user already exist",
          token: token,
        });
      } else {
        //if user not exist then convert plaintext password into hash password
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new authSchema({
          //query to create new user
          name: name,
          email: email,
          password: hashPassword,
        });
        await user.save();
       const emailSendResponse =await emailSend(email,"Congratulation you have successfull created account on Vikrant InnoByteAssignment")
  
        res.json(emailSendResponse)
      }
    } catch (error) {
      //error handling
      console.log(error);
      res.status(502).json({
        messae: "server error",
        err: error,
      });
    }
  },
  Login: async (req, res) => {
    const { email, password } = req.query;
    try {
      const data = await authSchema.findOne({ email: email });
      console.log(data);
      if (data) {
        const passwordMatch = await bcrypt.compare(password, data.password);
        console.log(passwordMatch);
        if (passwordMatch === true) {
          const token = jwt.sign({ email: email }, process.env.JWT_SCERET_KEY, {
            expiresIn: "1h",
          });
          res.status(200).json({
            message: "login successfully",
            token: token,
          });
        } else {
          res.status(400).json({
            message: "invalid detail",
          });
        }
      } else {
        res.status(404).json({
          message: "Not Found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(502).json({
        message: "server error",
        error: error,
      });
    }
  },
};
module.exports = Auth;
