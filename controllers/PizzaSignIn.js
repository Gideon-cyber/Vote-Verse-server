import Pizza from "../models/PizzaUser.js";

const PizzaSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    if (!email || !password) {
      res.status(403).send({
        message: "wrong email or password",
      });
    } else {
      const FindPizzaUser = await Pizza.find({
        email: email,
        password: password,
      });
      console.log(FindPizzaUser);
      if (FindPizzaUser.length > 0) {
        res.status(200).send({
          message: `Welcome ${FindPizzaUser[0].fullname}`,
          status: "200",
          user: FindPizzaUser,
        });
      } else {
        res.status(403).send({
          message: "User does not exist",
        });
      }
    }
  } catch (err) {
    res.status(403).send({
      message: err.message,
    });
  }
};

export default PizzaSignIn;
