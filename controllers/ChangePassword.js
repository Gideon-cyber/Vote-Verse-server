import Pizza from "../models/PizzaUser.js";

const ChangePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email) {
      const filter = { email: email };
      const update = {
        $set: {
          password: password,
        },
      };
      const options = { new: true };
      const updatedUser = await Pizza.findOneAndUpdate(filter, update, options);
      res.status(200).json({
        success: true,
        message: "Your password has been changed successfully",
        updatedUser: updatedUser,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Something went wrong, try again later.",
      });
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

export default ChangePassword;
