const User = require("../model/user_model");
const jwt = require('jsonwebtoken');
const axios = require('axios');
const httpStatus = require('http-status');

const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: "false", message: "No token provided" });

    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: "false", message: "Incorrect token format provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ success: "false", message: "Invalid token" });
    }

}

//for admins

const authGuardAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader)

    if (!authHeader) {
        return res.status(401).json({ success: "false", message: "Authentication token is missing" });
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(401).json({ success: "false", message: "Authentication token is not in the correct format" });
    }

    const token = tokenParts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = await User.findById(decoded._id); // Fetch the user by ID

        if (!user) {
            return res.status(401).json({ success: "false", message: "User not found" });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ success: "false", message: "Access denied: admin privileges required" });
        }

        req.user = user; // Assign the full user object to req.user
        next();
    } catch (error) {
        return res.status(401).json({ success: "false", message: "Invalid authentication token" });
    }
};


const newAuthGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided." });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ success: false, message: "Authorization format is Bearer <token>." });
    }

    const token = parts[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET); 
        req.user = decoded; 
        console.log(decoded)
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
};

const rateLimit = require('express-rate-limit');

  
const forgotPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, 
    handler: (req, res) => {
      res.json({
        success: false,
        message: 'Too many password reset attempts from this IP, please try again after 15 minutes',
      });
    },
  });
  
  const verifyRecaptcha = async (req, res, next) => {
    console.log(req.body)
    const recaptchaResponse = req.body['recaptchaToken']; 
  
  
    if (!recaptchaResponse) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'reCAPTCHA response is required'
      });
    }
  
    try {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY; 
      const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        params: {
          secret: secretKey,
          response: recaptchaResponse
        }
      });
  
      const data = response.data;
      console.log(data)
      if (data.success) {
        next(); 
      } else {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: 'reCAPTCHA verification failed'
        });
      }
    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error verifying reCAPTCHA'
      });
    }
  };

module.exports = { authGuard, authGuardAdmin,newAuthGuard,forgotPasswordLimiter,verifyRecaptcha };