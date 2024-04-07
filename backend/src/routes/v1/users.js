var router = require("express").Router();
const users = require("../../controllers/users");
const errors = require("../../middlewares/validator");

router.post("/users/signin", errors.USERS.SIGN_IN, users.signInWithOtp);
router.post("/users/register", errors.USERS.REGISTER, users.registerUser);
router.post("/users/verify", errors.USERS.VERIFY_OTP, users.verifyOtp);

module.exports = router;
