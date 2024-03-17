import mongoose from "mongoose";
const accreditSchema = new mongoose.Schema(
  {
    is_accredit: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Accredit = mongoose.model("accredit", accreditSchema);
export default Accredit;
