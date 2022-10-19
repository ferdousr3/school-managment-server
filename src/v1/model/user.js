const mongoose = require("mongoose");

// schema design

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name for tour"],
    trim: true,
    unique: [true, " Name must be unique"],
    minLength: [10, "Name must be at least 10 characters."],
    maxLength: [150, "Name is too large"],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price can't be negative"],
  },
  location: {
    type: String,
    required: true,
    minLength: [3, "Location must be at least 3 characters."],
    maxLength: [50, "Location is too large"],
  },
  duration: {
    type: String,
    required: true,
    minLength: [4, "Duration must be at least 4 characters."],
    maxLength: [50, "Duration is too large"],
  },
  isGuide: {
    type: Boolean,
    required: true,
  },
  viewed: {
    type: Number,
    required: true,
    min: [0, "Viewed can't be negative"],
  },
  food: {
    type: String,
    required: true,
    minLength: [4, "Duration must be at least 4 characters."],
    maxLength: [50, "Duration is too large"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
