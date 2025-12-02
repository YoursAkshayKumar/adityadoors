const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;

