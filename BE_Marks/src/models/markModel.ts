import mongoose from "mongoose";
import { TMark } from "../types/mark";

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
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  createdAt: {
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

const Mark = mongoose.model<TMark>("Mark", markSchema);

export default Mark;
