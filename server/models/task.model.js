const mongoose = require("mongoose");

const schema = mongoose.Schema,
  ObjectId = schema.ObjectId;

const tasksSchema = new schema(
  {
    authorId: {
      // type: String,
      // type: ObjectId, // here you set the author ID
      type: mongoose.Schema.Types.ObjectId,
      // from the Author colection,
      // so you can reference it
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", tasksSchema);
module.exports = Tasks;
