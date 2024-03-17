import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    Accredited: {
      type: Boolean,
      default: false,
    },
    Voted: {
      type: Boolean,
      default: null,
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    department: {
      type: String,
    },
    level: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Must provide a valid email"],
      unique: true,
      validate: {
        validator: function (value) {
          // Regular expression pattern for email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    role: {
      type: String,
      default: "voter",
    },

    matric: {
      type: String,
      required: [true, "Please provide a matriculation number"],
      unique: true,
    },
    president: {
      type: String,
    },
    gensec: {
      type: String,
    },
    vicePresident: {
      type: String,
    },
    sport: {
      type: String,
    },
    social: {
      type: String,
    },
    pro: {
      type: String,
    },
    finsec: {
      type: String,
    },
    treasurer: {
      type: String,
    },
    AGS: {
      type: String,
    },
    // specialDuties: {
    //   type: String,
    // },

    // FLC1: {
    //   type: String,
    // },
    // FLC2: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

// const BIC = mongoose.model("BIC", UserSchema);
// export default BIC;

const modelNames = ["BIC", "PHY", "MLS"];

const BICS = {};

// Iterate through the modelNames array and create the BIC
modelNames.forEach((modelName) => {
  BICS[modelName] = mongoose.model(modelName, UserSchema);
});

export default BICS;
