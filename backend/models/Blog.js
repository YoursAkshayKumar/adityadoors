const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      sparse: true, // Allows multiple null values
    },
    image: {
      type: String,
      required: false,
    },
    excerpt: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["Show", "Hide"],
      default: "Show",
    },
    author: {
      type: String,
      required: false,
    },
    metaTitle: {
      type: String,
      required: false,
      trim: true,
    },
    metaKeywords: [{ type: String }],
    metaDescription: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;