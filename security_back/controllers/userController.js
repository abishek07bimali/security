const User = require("../model/user_model");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const sendOTP = require("./otpControllers");
const multer = require('multer');
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");
const otpController = require("../controllers/otpControllers");
const OTP = require("../model/otpModel");


// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.email_app_password,
  },
});

// Function to send message
const sendMessage = async (email) => {
  const mailOptions = {
    from: process.env.email,
    to: email,
    subject:"Account Locked",
    text:"Account locked due to multiple failed login attempts. Try again in 24 hours.",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};


const signupUser = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password, phone, address } = req.body;

    if (!username || !email || !password || !phone || !address) {
      return res.json({
        success: false,
        message: "Please provide username, email, password, phone, and address",
      });
    }

    // Check if the user already exists and is verified
    const existingUser = await User.findOne({ email, isVerified: true });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Check if the user exists but is not verified
    const unverifiedUser = await User.findOne({ email, isVerified: false });
    if (unverifiedUser) {
      // Update the existing unverified user with the new details
      unverifiedUser.username = username;
      unverifiedUser.phone = phone;
      unverifiedUser.address = address;
      unverifiedUser.password = await bcrypt.hash(password, 10);

      // Save the updated unverified user
      await unverifiedUser.save();

      // Generate a new OTP and save it to the database
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const timestamp = Date.now();
      const newOTP = new OTP({ email, otp, timestamp });
      await newOTP.save();

      // Send OTP for verification
      await otpController.sendOTPRegistration(email, otp);

      return res.json({
        success: true,
        message: "User details updated successfully. Please check email for OTP verification",
        data: unverifiedUser,
      });
    }

    // Create a new user if the email does not exist
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate and save the OTP for the new user
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const timestamp = Date.now();
    const newOTP = new OTP({ email, otp, timestamp });
    await newOTP.save();

    // Send OTP for verification
    await otpController.sendOTPRegistration(email, otp);

    return res.json({
      success: true,
      message: "User created successfully. Please check email for OTP verification",
      data: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Signup error" });
  }
};


//http://localhost:5000/api/user/login

const loginUser = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email, isVerified: { $ne: true }  })
    // .populate(
    //   "favoriteCompanies favoriteNews.newsId employeeOf reviews.companyId connections"
    // );
  
    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Check if the account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.json({
        success: false,
        message: "Account locked. Try again later.",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      user.loginAttempt = user.loginAttempt + 1;

      if (user.loginAttempt >= 3) {
        user.lockUntil = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        await sendMessage(user.email)
        return res.json({
          success: false,
          message: "Account locked due to multiple failed login attempts. Try again in 24 hours.",
        });
      } else {
        await user.save();
        return res.json({ success: false, message: "Invalid credentials" });
      }
    }

    // Reset login attempts on successful login
    user.loginAttempt = 0;
    user.lockUntil = undefined;
    await user.save();

    const token = jwt.sign(
      { email: user.email, isAdmin: user.isAdmin, _id: user._id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRY_TIME }
    );
    // Remove password from the user object
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({
      success: true,
      message: "Login success",
      data: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Login error" });
  }
};


//works
//http://localhost:5000/api/user/updateuser
const updateUser = async (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage }).single('picture');

  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "Multer upload error", error: err.message });
    }

    console.log("Request body:", req.body);

    try {
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;
      const bio = req.body.bio;
      const darkmode = req.body.darkmode;
      const workDomain = req.body.workDomain;
      const favroiteCompanies = req.body.favroiteCompanies;
      const favroiteNews = req.body.favroiteNews;
      const interests = req.body.interests;
      const employeeOf = req.body.employeeOf;
      const reviews = req.body.reviews;
      const connections = req.body.connections;

      if (!email) {
        return res.status(400).json({ message: "Please provide an email" });
      }

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: "User with this email does not exist" });
      }

      let updateData = {};
      if (username) updateData.username = username;
      if (password) updateData.password = await bcrypt.hash(password, 10);
      if (bio) updateData.bio = bio;
      if (typeof darkmode !== 'undefined') updateData.darkmode = darkmode;
      if (workDomain) updateData.workDomain = workDomain;

      if (req.file) {
        const file = req.file;
        console.log("File:", file);
        let uploadedImage;
        try {
          uploadedImage = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { folder: "UserDP", crop: "scale", overwrite: true },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            ).end(file.buffer);
          });
          updateData.picture = uploadedImage.secure_url;
        } catch (error) {
          console.error("Image upload error:", error);
          return res.status(500).json({ message: "Image upload error" });
        }
      }

      if (favroiteCompanies) updateData.favroiteCompanies = favroiteCompanies;
      if (favroiteNews) updateData.favroiteNews = favroiteNews;
      if (interests) updateData.interests = interests;
      if (employeeOf) updateData.employeeOf = employeeOf;
      if (reviews) updateData.reviews = reviews;
      if (connections) updateData.connections = connections;

      const updatedUser = await User.findOneAndUpdate({ email }, updateData, { new: true }).populate('favroiteCompanies favroiteNews.newsId employeeOf reviews.companyId connections');

      res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Update error", error: error.message });
    }
  });
};



//http://localhost:5000/api/user/deleteuser
const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide an email and password" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }

    //check password too
    if (!bcrypt.compare(password, existingUser.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await User.findOneAndDelete({ email });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion error", error: error.message });
  }
};

// API endpoint to verify OTP
const savePassowrd = async (req, res) => {
  console.log(req.body);
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const checkAdmin = (req, res) => {
  // console.log(req.user)
  if (req.user && req.user.isAdmin) {
    res.status(200).json({
      success: true,
      message: "User is an admin.",
      data: { user: req.user },
    });
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. You must be an admin.",
    });
  }
};

module.exports = {
  loginUser,
  signupUser,
  updateUser,
  deleteUser,
  savePassowrd,
  checkAdmin,
};
