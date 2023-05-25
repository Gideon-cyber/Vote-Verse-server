import mongoose from "mongoose";

const OTPschema = new mongoose.Schema(
  {
    otp: {
      type: Number,
      //   required: [true, "must enter a valid otp"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 90000000, // Set the expiration time in milliseconds
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("otp", OTPschema);
export default OTP;
