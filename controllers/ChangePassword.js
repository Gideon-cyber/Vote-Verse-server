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
        status: true,
        message: "Your password has been changed statusfully",
        updatedUser: updatedUser,
      });
    } else {
      res.status(403).json({
        status: false,
        message: "Something went wrong, try again later.",
      });
    }
  } catch (err) {
    res.status(403).json({
      status: false,
      message: err.message,
    });
  }
};

export default ChangePassword;
