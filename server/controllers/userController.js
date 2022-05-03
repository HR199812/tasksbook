const USER = require("../models/user.model");
const conn = require("../auth/mongoConnection");
const bcrypt = require("bcryptjs");
const userController = {
  //@desc Add a new Admin
  //@route POST /user/add
  //@access Admin
  addUser: (req, res) => {
    USER.findOne(
      {
        userphone: req.body.userphone,
      },
      (err, user) => {
        if (user) {
          if (user.userphone === req.body.userphone) {
            res.status(200).json({ message: "User already exists" });
          }
        } else {
          let { userphone, userpassword } = req.body;
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(userpassword, salt, (err, hash) => {
              if (err) console.log(err);
              userpassword = hash;
              let userCreate = USER.create({
                userphone,
                userpassword,
              });
              if (userCreate) {
                res.status(201).json({
                  message: "Registered Successfully!\n You can Login.",
                });
              } else {
                res.status(400);
                throw new Error("Invalid user data");
              }
            });
          });
        }
      }
    );
  },
  getUser: async (req, res) => {
    USER.findOne(
      {
        userphone: req.body.userphone,
      },
      (err, user) => {
        if (user) {
          // Session Initiated
          req.session.user = user;
          res.status(201).json({ validUser: true });
        } else {
          res.status(200).json({
            validUser: false,
          });
        }
      }
    );
  },
  getSession: (req, res) => {
    res.send(req.session);
  },
  logoutUser: (req, res) => {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  },
  test: (req, res) => {
    res.send("All Ok");
  },
};

module.exports = userController;
