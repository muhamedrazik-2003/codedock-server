const users = require("../Models/userModel");
const jwt = require("jsonwebtoken");

exports.UserLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      const token = jwt.sign({ user: existingUser._id }, process.env.SECRETKEY);
      response.status(200).json({ token, existingUser });
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

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.payload;

    if (req.file) {
      var { username, github, linkedin } = req.body;
      var profile = req.file.filename;
    } else {
      var { username, github, linkedin, profile } = req.body;
    }

    const response = await users.findByIdAndUpdate(userId, {
      username,
      github,
      linkedin,
      profile,
    });
    res.status(200).json({ message: "profile updated", response });
  } catch (error) {
    res.status(404).json({ message: "Error Occured", error: error.message });
  }
};
