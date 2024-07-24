const router = require("express").Router();

const contactController = require("../controllers/contactController");



router.post("/create_contact",contactController.validateContact, contactController.createContact);
router.get("/get_contact", contactController.viewAllContact);

module.exports = router;