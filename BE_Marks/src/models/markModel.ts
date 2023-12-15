import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  tag: {
    required: true,
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
  likes: {
    required: true,
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now(),
  },
});

markSchema.set("toJSON", {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__V;
  },
});

markSchema.set("toObject", {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__V;
  },
});

const Mark = mongoose.model("Mark", markSchema);

export default Mark;
