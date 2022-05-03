const express = require("express");
const taskController = require("../controllers/tasksController");
// const server = express();
const taskRouter = require("express").Router();

taskRouter.post("/addTaskForCurrentUser", taskController.addTask);
taskRouter.put("/updateTaskForUser", taskController.updateTask);
taskRouter.get("/getAllTasksForUser/:id", taskController.getAllTasks);
taskRouter.get("/getFileForTask/:id", taskController.getFile);
taskRouter.get("/getFilteredTasksForUser", taskController.getFilteredTasks);

// taskRouter.get("/test", taskController.test);

module.exports = taskRouter;
