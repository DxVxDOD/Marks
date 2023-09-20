/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "../utils/config.js";
import { TMark } from "../types/mark.js";

dotenv.config();

const { MONGO_URI } = config;

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

const marksSchema = new mongoose.Schema({
  title: String,
  tag: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

marksSchema.set("toJSON", {
  transform(document, returnedObject) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Mark = mongoose.model<TMark>("Mark", marksSchema);

export default Mark;
