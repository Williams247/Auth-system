const router = require("express").Router();

// Route for forgot password
module.exports = router.post("/forgot-password", require("../../controllers/auth/forgot-password").handleForgotPassword);
