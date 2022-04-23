const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    userpassword: {
      type: String,
      required: true,
      trim: true,
    },
    usermail: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);
module.exports = User;
