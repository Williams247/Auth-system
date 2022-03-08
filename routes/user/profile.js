const router = require("express").Router();

const auth = require("../../middleware");
// Route to get a user profile
module.exports = router.get("/profile", auth, require("../../controllers/user/profile").handleGetProfile);
