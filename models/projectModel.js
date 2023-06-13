const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User is required."],
  },
  role: {
    type: String,
    required: [true, "Role is required."],
  },
});

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    status: {
      type: String,
      required: [true, "Status is required."],
      default: "active",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Owner is required."],
    },
    members: [memberSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("projects", projectSchema);
