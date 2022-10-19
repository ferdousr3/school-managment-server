const app = require("./app");
const colors = require("colors");
const config = require("./config/config");
const port = config.app.port;

app.listen(port, () => {
  console.log(`The Tours is going on port ${port}`.yellow.bold);
});
