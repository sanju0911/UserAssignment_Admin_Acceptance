const mongooseLib = require("mongoose");

const initiateDBConnection = async () => {
  try {
    await mongooseLib.connect(process.env.DATABASE_URI);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = initiateDBConnection;
