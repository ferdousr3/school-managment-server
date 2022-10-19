const mongoose = require("mongoose");
const config = require("./config");
const colors = require("colors");
const dbURL = config.db.url;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log(`Database connection is successful 🛢`.red.bold);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
