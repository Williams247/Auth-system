const router = require("express").Router();

// Route to login a user
module.exports = router.post("/login", require("../../controllers/auth/login").handleLogin);
