const express = require("express");
const taskController = require("../controllers/tasksController");
// const server = express();
const taskRouter = require("express").Router();

taskRouter.post("/addTaskForCurrentUser", taskController.addTask);
taskRouter.post("/getAllTasksForCurrentUser", taskController.getAllTasks);
// taskRouter.get("/test", taskController.test);

module.exports = taskRouter;
