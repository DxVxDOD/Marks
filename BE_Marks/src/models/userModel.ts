import type { ObjectId } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  marks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mark",
    },
  ],
});

userSchema.set("toJSON", {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    returnedObject._id = {} as ObjectId;
    returnedObject.__v = 0;
    returnedObject.password = "";
  },
});

userSchema.set("toObject", {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    returnedObject._id = {} as ObjectId;
    returnedObject.__v = 0;
    returnedObject.password = "";
  },
});

const User = mongoose.model("User", userSchema);

export default User;
