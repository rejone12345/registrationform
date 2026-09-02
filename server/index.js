require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const registerRoute = require("./routes/register");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────
app.use("/api/register", registerRoute);

// ── Health check ──────────────────────────────────────────────
app.get("/", (_req, res) =>
  res.json({ status: "ok", message: "Registration API is running" })
);

// ── MongoDB connection & server start ─────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅  Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀  Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1);
  });
