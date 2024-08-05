const router = require("express").Router();

const userController = require("../controllers/userController");
const connectionController = require("../controllers/connectionControllers");
const otpController = require("../controllers/otpControllers");
const { authGuard, authGuardAdmin,forgotPasswordLimiter } = require("../middleware/authGuard");


router.post("/login", userController.loginUser);
router.post("/signup", userController.signupUser);
router.post("/updateuser",authGuard, userController.updateUser);
router.post("/deleteuser",authGuard, userController.deleteUser);

router.post('/forgotpassword',forgotPasswordLimiter, otpController.sendOTPMail);
router.post('/verify-otp', otpController.verifyOTPMail);
router.post('/reset-password', userController.savePassowrd);


router.post("/createconnection", authGuard, connectionController.createConnection);
router.get("/viewallconnections", connectionController.viewAllConnections);


router.get("/check-admin", authGuardAdmin, userController.checkAdmin);


module.exports = router;