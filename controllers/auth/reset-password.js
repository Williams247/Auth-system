const bcrypt = require("bcryptjs");
const { User, Otp } = require("../../models/index");
const { validateResetPassword } = require("../../validations/auth/reset-password");

exports.handleResetPassword = async (request, response) => {
  try {
    const { body: { email, password } } = request;
    const validateUserResetPassword = validateResetPassword(request.body);
    if (validateUserResetPassword.error) {
      return response.status(400).json({ error: validateUserResetPassword.error.message });
    }
    const otp = await Otp.findOne({ email: email });
    if (otp.isVerified !== true) return response.status(422).json({ error: "OTP not verified yet, try to verify your OTP." });
    const user = await User.findOne({ email: email });
    if (!user) return response.status(404).json({ error: "Email does not exist." });
    const updateUser = await User.findByIdAndUpdate(user._id);
    const hasedPassword = await bcrypt.hash(password, 10);
    updateUser.password = hasedPassword;
    await updateUser.save();
    await Otp.findOneAndDelete({ email: email });
    response.status(200).json({ message: "Password updated successfully." })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to reset password." });
  }
};
