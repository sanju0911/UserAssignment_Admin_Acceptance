const mongoDB = require("mongoose");

const TaskSchema = new mongoDB.Schema({
  uploaderId: {
    type: mongoDB.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskDescription: { type: String },
  fileLink: { type: String },
  fileTitle: { type: String },
  assignedAdminId: {
    type: mongoDB.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskStatus: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
  submissionDate: { type: Date, default: Date.now },
});

module.exports = mongoDB.model("Task", TaskSchema);
