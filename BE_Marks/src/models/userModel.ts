import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    returnedObject.password = "";
    returnedObject._id = {} as ObjectId;
    returnedObject.__v = 0;
  },
});

userSchema.set("toObject", {
  transform(_document, returnedObject) {
    returnedObject.password = "";
    returnedObject._id = {} as ObjectId;
    returnedObject.__v = 0;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
