import Pizza from "../models/PizzaUser.js";

const PizzaSignUp = async (req, res) => {
  const { fullname, email, password, phone, confirmPassword } = req.body;

  try {
    if (!fullname || !email || !phone || !password) {
      res.status(400).send({
        message: "Please provide all credentials",
      });
    } else {
      if (password !== confirmPassword) {
        res.status(400).send({
          message: "Password mismatch",
        });
      } else {
        const existingUser = await Pizza.findOne({
          email: email,
          password: password,
        });

        if (existingUser) {
          res.status(400).send({
            message: "User already exists",
          });
          console.log(existingUser);
        } else {
          const newPizzaUser = await new Pizza({
            fullname,
            email,
            password,
            phone,
          });

          const createdPizza = await newPizzaUser.save();
          console.log(createdPizza);
          res.status(200).send({
            message: `welcome ${createdPizza.fullname}`,
            user: createdPizza,
            status: "200",
          });
        }
      }
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

export default PizzaSignUp;
