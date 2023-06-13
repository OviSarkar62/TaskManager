const router = require("express").Router();

const Task = require("../models/taskModel");
const authMiddleware = require("../middlewares/authMiddleware");

// create a task
router.post("/create-task", authMiddleware, async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.send({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all tasks
router.post("/get-all-tasks", authMiddleware, async (req, res) => {
  try {
    const filters = {};
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== "all") {
        filters[key] = req.body[key];
      }
    });
    delete filters["userId"];

    if (req.body.dueDate) {
      filters.dueDate = { $lte: new Date(req.body.dueDate) };
    }

    const tasks = await Task.find(filters)
      .populate("assignedTo")
      .populate("assignedBy")
      .populate("project")
      .sort({ createdAt: -1 });

    res.send({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// update task
router.post("/update-task", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete task
router.post("/delete-task", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.body._id);
    res.send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;