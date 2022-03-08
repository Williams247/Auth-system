const mongoose = require("mongoose");

const userSchema = mongoose.Schema;

const User = new userSchema({
  username: {
    type: String,
    required: true,
    max: 25,
    min: 3
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", User);
