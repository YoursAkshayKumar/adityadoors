const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productCategory: {
      type: String,
      required: false,
      trim: true,
    },
    productPrice: {
      type: Number,
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please enter a valid email address'
      }
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    inquiryType: {
      type: String,
      enum: ["general", "pricing", "availability", "installation", "customization", "warranty"],
      required: true,
      default: "general",
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "resolved", "closed"],
      default: "pending",
    },
    // Keep nested product for backward compatibility (optional)
    product: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
module.exports = Inquiry;

