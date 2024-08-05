// contactController.js

const { body, validationResult } = require("express-validator");
const Contact = require("../model/contactModel");

// Validation middleware for the contact creation 
const validateContact = [
  body("fullname")
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ max: 100 })
    .withMessage("Full name cannot exceed 100 characters."),
  body("email").isEmail().withMessage("Invalid email address.").normalizeEmail(),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage("Invalid phone number."),
  body("address")
    .notEmpty()
    .withMessage("Address is required.")
    .isLength({ max: 200 })
    .withMessage("Address cannot exceed 200 characters."),
  body("message")
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters."),
];

// Function to create a new contact
const createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { fullname, email, phone, address, message } = req.body;

    const newContact = new Contact({
      fullname,
      email,
      phone,
      address,
      message,
    });

    await newContact.save();

    return res.json({
      success: true,
      message: "Contact created successfully",
      // data: newContact,
    });
  } catch (error) {
    console.error("Contact creation error:", error);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Function to view all contacts
const viewAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Export the functions
module.exports = {
  validateContact,
  createContact,
  viewAllContact,
};
