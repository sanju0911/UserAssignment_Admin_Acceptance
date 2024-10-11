const expressServer = require("express");
const enableCors = require("cors");
const loadEnv = require("dotenv");
const initializeDB = require("./Config/Database");

const userEndpoints = require("./Routes/userRoutes");
const adminEndpoints = require("./Routes/adminRoutes");

loadEnv.config();

const serverApp = expressServer();
serverApp.use(enableCors());
serverApp.use(expressServer.json());

serverApp.use("/user", userEndpoints);
serverApp.use("/admin", adminEndpoints);

const SERVER_PORT = process.env.SERVER_PORT || 8000;

serverApp.listen(SERVER_PORT, () => {
  initializeDB();
  console.log(`Application is running on port ${SERVER_PORT}`);
});
