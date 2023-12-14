import mongoose, { Document } from "mongoose";
import { TUser } from "../types/user";

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
  marks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mark",
    },
  ],
});

userSchema.set("toJSON", {
  transform(_document: Document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model<TUser>("User", userSchema);

export default User;
