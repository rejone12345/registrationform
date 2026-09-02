const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    unique: true,
    trim: true,
    validate: {
      validator: (v) => /^\d{10,15}$/.test(v),
      message: "Mobile number must contain 10–15 digits",
    },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: "",
  },
  address: {
    type: String,
    trim: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
