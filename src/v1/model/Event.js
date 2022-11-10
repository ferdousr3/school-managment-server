const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      require: true,
      minLength: [3, 'Event name is too short'],
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: [3, 'Organizer name is too short'],
    },
    place: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['open', 'closed'],
        error: "{VALUE} can't be a status",
      },
      default: 'open',
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
