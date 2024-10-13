const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const assignmentRoutes = require("./Routes/assignmentRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const DatabaseConnection = require("./Config/Database");
const app = express();
app.use(bodyParser.json());

dotenv.config();

DatabaseConnection();

const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/assignments", assignmentRoutes);

app.listen(PORT, () => {
  console.log("server is runnign at", PORT);
});
