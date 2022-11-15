const {
  getEventService,
  createEventService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} = require("../services/event.service");

/**
 * get all events
 */
exports.getEvents = async (req, res) => {
  try {
    let filters = { ...req.query };

    //sort , page , limit -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt ,lt ,gte .lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query; // "3" "10"
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const events = await getEventService(filters, queries);

    res.status(200).json({
      status: "success",
      data: events,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

/**
 * get event by id
 */
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getEventByIdService(id);
    if (!result.length) {
      return res.status(400).json({
        status: "failed",
        message: "Couldn't found any event with this id",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Successfully get an event",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      status: "failed",
      error: error.message,
    });
  }
};

/**
 * create an event
 */
exports.createEvent = async (req, res) => {
  try {
    const data = req.body;
    const result = await createEventService(data);
    res.status(200).json({
      status: "success",
      message: "Successfully create an event",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};

/**
 * Update an event
 */
exports.updateEvent = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const result = await updateEventService(id, data);
    console.log(result);

    if (!result.modifiedCount) {
      return res.status(404).json({
        status: "failed",
        message: "Could not found any event with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully update an event",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
/**
 * delete an event
 */
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteEventService(id);

    if (!result.deletedCount) {
      return res.status(404).json({
        status: "failed",
        message: "Couldn't found any event with this id ",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully deleted the event",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};
