require("dotenv").config();
process.env.APP_VERSION = require("./package.json").version;

const appServer = require("./app/server");

const appPort = (process.env.APP_PORT || 8080);

appServer.listen(appPort, function startApp() {
  console.log(`APP_ENV ${process.env.APP_ENV}`);
  console.log(`v${process.env.APP_VERSION}`);
});
