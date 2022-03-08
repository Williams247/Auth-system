const { User, Otp } = require("../../models/index");
const { sendMail } = require("../../utils/index");
const { random } = require("../../helper/index");

exports.handleForgotPassword = async (request, response) => {
  try {
    // Request body for email
    const email = request.body.email;
    // Failed cases
    if (!email) return response.status(400).json({ error: "Enter your email." });
    const user = await User.findOne({ email: email });
    if (!user) return response.status(404).json({ error: "Email does not exist." });
    // Generates 4 digits random values
    const randomValue = random(10000);
    // Checks if there is an already existing OTP in the OTP collection and sends a mail
    const checkOtp = await Otp.findOne({ userId: user._id });
    if (checkOtp) {
      const updateOtp = await Otp.findOneAndUpdate({ userId: checkOtp.userId });
      updateOtp.otpCode = randomValue;
      updateOtp.isVerified = false;
      updateOtp.time = new Date().toLocaleString();
      await updateOtp.save();
      const sendMailResponse = await sendMail(email, randomValue, user.username);
      return response.status(200).json({ message: sendMailResponse });
    }
    // Creates a new OTP record in the OTP collection and sends a mail
    const otp = new Otp({
      userId: user._id,
      email: email,
      otpCode: randomValue,
      isVerified: false,
      time: new Date().toLocaleString()
    });
    await otp.save();
    const sendMailResponse = await sendMail(email, randomValue, user.username);
    response.status(200).json({ message: sendMailResponse });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Forgot password failed." });
  }
};
