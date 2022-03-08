const router = require("express").Router();

// Route to reset password
module.exports = router.post("/reset-password", require("../../controllers/auth/reset-password").handleResetPassword);
