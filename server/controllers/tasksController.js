const TASK = require("../models/task.model");
const conn = require("../auth/mongoConnection");
const fs = require("fs");
const taskController = {
  //@desc Add a new Admin
  //@route POST /user/add
  //@access Admin
  addTask: async (req, res) => {
    console.log(req.files);
    console.log(req.body);
    const { authorId, title, body, category } = req.body;
    const filepath = process.env.FILE_PATH;
    const taskCreate = await TASK.create({
      authorId,
      title,
      category,
      body,
    });
    if (taskCreate) {
      try {
        if (req.files) {
          const file = req.files.file;
          file.mv(`${filepath}${file.name}_${taskCreate._id}.zip`, (err) => {
            if (err) {
              console.log("File upload failed");
            }
            console.log("File Uploaded");
          });
        }
        res.status(201).json({
          message: "New Task Created Successfully",
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  },
  getAllTasks: async (req, res) => {
    const allTasks = await TASK.find(
      { authorId: `${req.params.id}` },
      { title: 1, body: 1, category: 1, createdAt: 1, _id: 1 }
    );
    res.status(200).json(allTasks);
  },
  getFile: async (req, res) => {
    try {
      console.log(req.params);
      const directoryPath = process.env.FILE_PATH;
      console.log(directoryPath);
      fs.readdir(directoryPath, function (err, files) {
        if (err) {
          res.status(500).send({
            message: "Unable to scan files!",
          });
        }

        try {
          files.forEach((file) => {
            console.log(file);
            if (file.includes(req.params.id)) {
              // console.log(directoryPath + file);
              res.download(directoryPath + file);
            }
          });
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      res.status(400).json(err);
    }
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
