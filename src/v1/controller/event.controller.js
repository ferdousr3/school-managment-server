const {
  getEventService,
  createEventService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} = require('../services/event.service');

/**
 * get all events
 */
exports.getEvents = async (req, res) => {
  try {
    const result = await getEventService();
    res.status(200).json({
      status: 'Success',
      message: 'Successfully get all the events',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
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
        status: 'failed',
        message: "Couldn't found any event with this id",
      });
    }
    res.status(200).json({
      status: 'Success',
      message: 'Successfully get an event',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      status: 'failed',
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
      status: 'success',
      message: 'Successfully create an event',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
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
        status: 'failed',
        message: 'Could not found any event with this id',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully update an event',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
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
        status: 'failed',
        message: "Couldn't found any event with this id ",
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully deleted the event',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
