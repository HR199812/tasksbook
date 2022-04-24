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
    const allTasks = await TASK.find(
      { authorId: `${req.params.id}` },
      { title: 1, body: 1, category: 1, createdAt: 1 }
    );
    res.status(200).json(allTasks);
  },
  updateTask: async (req, res) => {
    const task = await TASK.updateOne(
      { _id: `${req.body.id}` },
      {
        $set: {
          title: req.body.title,
          body: req.body.body,
          category: req.body.category,
        },
      }
    );
    if (task) {
      console.log(task);
      res.status(200).json({
        message: "Record Updated Successfully",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  },
  test: (req, res) => {
    res.send("All Ok");
  },
};

module.exports = taskController;
