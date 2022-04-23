const TASK = require("../models/task.model");
const conn = require("../auth/mongoConnection");
const taskController = {
  //@desc Add a new Admin
  //@route POST /user/add
  //@access Admin
  addTask: async (req, res) => {
    const { authorId, title, category, body, filepath } = req.body;
    const taskCreate = await TASK.create({
      authorId,
      title,
      category,
      body,
      filepath,
    });
    if (taskCreate) {
      res.status(201).json({
        message: "New Task Created Successfully",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  },
  getAllTasks: async (req, res) => {
    const allUsers = await user.find({});
    res.status(200).json(allUsers);
  },
  test: (req, res) => {
    res.send("All Ok");
  },
};

module.exports = taskController;
