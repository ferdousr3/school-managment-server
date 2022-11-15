const Event = require("../model/Event");

// get all events
exports.getEventService = async (filters, queries) => {
  const events = await Event.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Event.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, events };
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
