const express = require("express");
const taskController = require("../controllers/tasksController");
// const server = express();
const taskRouter = require("express").Router();

// taskRouter.post("/get", taskController.addAdmin);
// taskRouter.get("/test", taskController.test);

module.exports = taskRouter;
