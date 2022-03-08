const { User } = require("../../models/index");

exports.handleGetProfile = async (request, response) => {
  try {
    const user = await User.findOne({ _id: request.user.id });
    console.log(user)
    response.status(200).json({
      message: "Success",
      result: user
   })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get profile." });
  }
};
