const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const BookedRoom = require("../models/bookedRoom.model");
const roomModel= require("../models/room.model")


module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { fullName, email, password, password1, address, phoneNumber } =
    req.body;
  console.log(fullName, email, password, address, phoneNumber);
  // Check if required fields are provided
  if (!fullName || !email || !password || !phoneNumber || !address) {
    return res.status(400).json({
      success: false,
      message: "All fields are required (fullname, email, and password)",
    });
  }

  if (password !== password1) {
    return res.status(401).json({
      success: false,
      message: "Confirm Password doesn't Matched",
    });
  }

  try {
    // Check if the user already exists
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
    });

    // Generate authentication token
    const token = user.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });
    // Respond with success
    res.status(201).json({
      success: true,
      message: "You are registered",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Longin Route
module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  // Check if required fields are provided
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate authentication token
    const token = user.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });
    // Respond with success
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Logout

module.exports.logout = async (req, res, next) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


