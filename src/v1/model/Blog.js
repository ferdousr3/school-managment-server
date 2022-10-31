const mongoose = require("mongoose");
const validator = require("validator");

// schema design

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide a blog Title"],
    unique: [true, "Title must be unique"],
    minLength: [10, "Title must be at least 10 characters."],
    maxLength: [50, "Title is too large"],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "Description must be at least 10 characters."],
  },
  author: {
    type: String,
    required: true,
    minLength: [4, "author name is too short"],
    maxLength: [10, "Author is too large"],
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    minLength: [3, "slug is too short"],
    maxLength: [50, "slug is too large"],
  },
  category: {
    type: String,
    required: true,
    trim: true,
    minLength: [4, "Duration must be at least 4 characters."],
    maxLength: [10, "Duration is too large"],
  },
  source: {
    type: String,
    unique: true,
    minLength: [4, "Duration must be at least 4 characters."],
    maxLength: [10, "Duration is too large"],
  },
  image: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isURL, "Please provide a valid URL"],
  },
  date: {
    type: String,
    required: true,
   
    minLength: [10, "date is too short"],
    maxLength: [23, "date is too large"],
  },
  status: {
    type: String,
    trim: true,
    enum: ["pending", "published"],
    default: "pending",
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
