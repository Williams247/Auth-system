const bcrypt = require("bcryptjs");
const { User } = require("../../models/index");
const { validateSignUp } = require("../../validations/auth/signup");

exports.handleSignUp = async (request, response) => {
  try {
    // Request bodies
    const { body: { username, email, password } } = request;
    // Input validations
    const validateUserSignUp = validateSignUp(request.body);
    if (validateUserSignUp.error) {
      return response.status(400).json({ error: validateUserSignUp.error.message });
    }
    // Checks for registered users
    const user = await User.findOne({ email: email });
    if (user) return response.status(409).json({ message: "Email already taken." });
    // Hashes a user password
    const hashPassword = await bcrypt.hash(password, 10);
    // Creates a new user
    const createUser = new User({
      username: username,
      email: email,
      password: hashPassword
    });
    await createUser.save();
    response.status(201).json({ message: "Congratulations, you have been registered." })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Registration failed." })
  }
};
