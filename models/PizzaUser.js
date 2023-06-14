import mongoose from "mongoose";

const PizzaSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "you must provide a name"],
    },

    email: {
      type: String,
      required: [true, "Must provide a valid email"],
      validate: {
        validator: function (value) {
          // Regular expression pattern for email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    phone: {
      type: String,
      required: [true, "must provide a valid phone"],
    },
    password: {
      type: String,
      required: [true, "must provide a valid password"],
    },
  },
  { timestamps: true }
);

const Pizza = mongoose.model("Pizza", PizzaSchema);
export default Pizza;
