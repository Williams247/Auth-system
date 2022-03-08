const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/index");
const { validateLogin } = require("../../validations/auth/login");

exports.handleLogin = async (request, response) => {
  try {
    // Request body
    const { body: { email, password } } = request;
    // Error validation
    const validateUserLogin = validateLogin(request.body);
    if (validateUserLogin.error) {
      return response.status(400).json({ error: validateUserLogin.error.message });
    }
    // Wrong email and password check
    const user = await User.findOne({ email: email });
    if (!user) return response.status(404).json({ error: "Email is incorrect." });
    const validatedPassword = await bcrypt.compare(password, user.password);
    if (!validatedPassword) return response.status(404).json({ error: "Password is incorrect." });
    // Success
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 });
    response.status(200).json({
      message: "You are now logged in.",
      result: {
        token: token,
        user: payload
      }
    })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Login failed" });
  }
};
