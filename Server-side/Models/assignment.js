const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    task: {
      type: String,
      required: [true, "Task description is required"],
    },
    admin: {
      type: String,
      required: [true, "Admin name is required"],
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    versionKey: false,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
