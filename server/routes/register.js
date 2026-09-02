const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/register
router.post("/", async (req, res) => {
  try {
    const { fullName, fatherName, motherName, mobileNumber, email, address } =
      req.body;

    // ── Server-side validation ──────────────────────────────────
    const errors = [];

    if (!fullName?.trim()) errors.push("Full name is required");
    if (!fatherName?.trim()) errors.push("Father's name is required");
    if (!motherName?.trim()) errors.push("Mother's name is required");
    if (!mobileNumber?.trim()) {
      errors.push("Mobile number is required");
    } else if (!/^\d{10,15}$/.test(mobileNumber.trim())) {
      errors.push("Mobile number must contain 10–15 digits");
    }

    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    // ── Check for duplicate mobile ──────────────────────────────
    const existing = await User.findOne({ mobileNumber: mobileNumber.trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        errors: ["A user with this mobile number already exists"],
      });
    }

    // ── Create & save ───────────────────────────────────────────
    const user = await User.create({
      fullName: fullName.trim(),
      fatherName: fatherName.trim(),
      motherName: motherName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email?.trim() || "",
      address: address?.trim() || "",
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: { id: user._id, fullName: user.fullName },
    });
  } catch (err) {
    console.error("Registration error:", err);

    // Handle Mongoose duplicate-key error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        errors: ["A user with this mobile number already exists"],
      });
    }

    return res.status(500).json({
      success: false,
      errors: ["Internal server error. Please try again later."],
    });
  }
});

module.exports = router;
