const router = require("express").Router();

// Route to signup a user
module.exports = router.post("/signup", require("../../controllers/auth/signup").handleSignUp);
