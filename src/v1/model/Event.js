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
      maxLength: [120, 'Event name is too short'],
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: [3, 'Organizer name is too short'],
      maxLength: [120, 'Organizer name is too long'],
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
        values: ['open','running', 'closed'],
        error: "{VALUE} can't be a status",
      },
      default: 'open',
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: false,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
