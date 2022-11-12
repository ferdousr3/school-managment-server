const express = require('express');
const eventController = require('../controller/event.controller');
const router = express.Router();

/**
 * get all events ,
 * create an event
 */
router
  .route('/')
  .get(eventController.getEvents)
  .post(eventController.createEvent);

/**
 * get event by id
 * update event by id
 * delete event by id
 */
router
  .route('/:id')
  .get(eventController.getEventById)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
