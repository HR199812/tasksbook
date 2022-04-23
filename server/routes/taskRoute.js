const express = require("express");
const taskController = require("../controllers/tasksController");
// const server = express();
const taskRouter = require("express").Router();

taskRouter.post("/addTaskForCurrentUser", taskController.addTask);
taskRouter.get("/getAllTasksForUser/:id", taskController.getAllTasks);
// taskRouter.get("/test", taskController.test);

module.exports = taskRouter;
