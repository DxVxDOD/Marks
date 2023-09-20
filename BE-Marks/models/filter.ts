import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "../utils/config.js";
import { TFilter } from "../types/filter.js";

dotenv.config();

const { MONGO_URI } = config;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected"))
  .catch((err) => console.log("error connecting to MongoDB", err.message));

const filterSchema = new mongoose.Schema({
  filterName: String,
  markId: String,
});

filterSchema.set("toJSON", {
  transform(document, returnedObject) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Filter = mongoose.model<TFilter>("Filter", filterSchema);

export default Filter;
