const expressServer = require("express");
const enableCors = require("cors");
const loadEnv = require("dotenv");
const initializeDB = require("./config/dbConnection");
const pathUtil = require("path");

const userEndpoints = require("./routes/userHandlers");
const adminEndpoints = require("./routes/adminHandlers");

loadEnv.config();

const serverApp = expressServer();
serverApp.use(enableCors());
serverApp.use(expressServer.json());

serverApp.use(
  "/files",
  expressServer.static(pathUtil.join(__dirname, "uploads"))
);

serverApp.use("/user", userEndpoints);
serverApp.use("/admin", adminEndpoints);

const SERVER_PORT = process.env.SERVER_PORT || 5000;

serverApp.listen(SERVER_PORT, () => {
  initializeDB();
  console.log(`Application is running on port ${SERVER_PORT}`);
});
