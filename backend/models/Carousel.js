const mongoose = require("mongoose");
const valid = require("validator");

const carouselSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      validate: [valid.isURL, "wrong url"],
    },
    backgroundImage: {
      type: String,
      required: false,
      validate: {
        validator: function(v) {
          return !v || valid.isURL(v);
        },
        message: "wrong url"
      },
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    link: {
      type: String,
      required: false,
      trim: true,
    },
    buttonText: {
      type: String,
      required: false,
      default: "READ MORE",
    },
  },
  { timestamps: true }
);

const Carousel = mongoose.model("Carousel", carouselSchema);
module.exports = Carousel;

