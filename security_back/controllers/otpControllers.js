const nodemailer = require("nodemailer");
const User = require("../model/user_model");
const otpGenerator = require("otp-generator");

const OTP = require("../model/otpModel");

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.email_app_password,
  },
});

// Function to generate a random OTP and timestamp
const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const timestamp = Date.now();
  return { otp, timestamp };
};

// Function to send OTP via email for registration verification
const sendOTPRegistration = async (email, otp) => {
  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: "OTP for Email Verification",
    text: `Your OTP for Verification of email address is: ${otp}. This email is valid for 5 minutes only.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

// Function to send OTP via email
const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: "OTP for Password Reset",
    text: `Your OTP for password reset is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

// API endpoint to send OTP via email
const sendOTPMail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const timestamp = Date.now();

    await sendOTP(email, otp);

    const newOTP = new OTP({
      email,
      otp,
      timestamp,
    });

    await newOTP.save();

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// API endpoint to verify OTP
const verifyOTPMail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    //find email and otp in db
    const otpDB = await OTP.findOne({ email, otp });

    if (!otpDB) {
      return res.json({
        success: false,
        message: "Invalid OTP or expired. Please request a new OTP",
      });
    } else {
      res
        .status(200)
        .json({ success: true, message: "OTP verified successfully" });
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(req.body)

    // Find email and OTP in the OTP collection
    const otpDB = await OTP.findOne({ email, otp });

    if (!otpDB) {
      return res.json({
        success: false,
        message: "Invalid OTP or expired. Please request a new OTP",
      });
    }
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    // Update the isVerified field of the user
    user.isVerified = true;
    await user.save();

    res.json({ success: true, message: "OTP verified successfully, user verified" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};


module.exports = { sendOTPMail, verifyOTPMail,sendOTPRegistration,verifyUser };