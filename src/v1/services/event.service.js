const Event = require('../model/Event');

// get all events
exports.getEventService = async () => {
  const events = await Event.find({});
  return events;
};

// get event by Id
exports.getEventByIdService = async (id) => {
  const event = await Event.find({ _id: id });
  return event;
};

// create an event
exports.createEventService = async (data) => {
  const result = await Event.create(data);
  return result;
};

// update an event
exports.updateEventService = async (id, data) => {
  const result = await Event.updateOne({ _id: id }, { $set: data });
  return result;
};

// delete an event
exports.deleteEventService = async (id) => {
  const result = await Event.deleteOne({ _id: id });
  return result;
};
