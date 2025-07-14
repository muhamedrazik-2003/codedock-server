const users = require("../Models/userModel");
const jwt = require('jsonwebtoken');

exports.UserLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      const token = jwt.sign({user:existingUser._id}, process.env.SECRETKEY);
      response.status(200).json({token, username:existingUser.username});
    } else {
      response.status(404).json("invalid Email or Password");
    }
  } catch (error) {
    response.status(400).json(error);
  }
};

exports.UserRegister = async (request, response) => {
  try {
    const { username, password, email } = request.body;
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      response.status(406).json("User already Exists!!");
    } else {
      const newUser = new users({
        email,
        password,
        username,
        linkedin: "",
        github: "",
        profile: "",
      });
      await newUser.save();
      response.status(201).send("User Registration Successfull");
    }
  } catch (error) {
    console.log(error);
    response.status(401).json(error);
  }
};
