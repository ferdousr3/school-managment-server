const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
// const userRoute = require("./src/v1/routes/User.route");
const blogRoute = require('./src/v1/routes/Blog.router');
const eventRoute = require('./src/v1/routes/event.route');

const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Routes for version one
 */
// app.use("/api/v1/user", userRoute);
app.use('/api/v1/blog', blogRoute);
app.use('/api/v1/event', eventRoute);

//Home route -> when server run
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

//Route is found
app.use((req, res, next) => {
  res.status(404).json({
    message: 'route is not found',
  });
});

// Server is not found
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'server is not found',
  });
});

module.exports = app;
