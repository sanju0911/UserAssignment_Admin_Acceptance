const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes.js");
const adminRoutes = require("./Routes/adminRoutes.js");
const assignmentRoutes = require("./Routes/assignmentRoutes.js");
const DatabaseConnection = require("./Config/Database.js");

dotenv.config();

const app = express();
DatabaseConnection();
app.use(bodyParser.json());

const SERVER_PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/assignments", assignmentRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
