const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Show", "Hide"],
      default: "Show",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const FAQ = mongoose.model("FAQ", faqSchema);
module.exports = FAQ;

