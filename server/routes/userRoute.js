const express = require("express");
const userController = require("../controllers/userController");
const server = express();
const userRouter = express.Router();

userRouter.post("/addUser", userController.addUser);
userRouter.get("/getUsers", userController.getUsers);
// userRouter.get("/getUser", userController.test);

module.exports = userRouter;
