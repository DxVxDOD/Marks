import config from "./utils/config.js";
import express from "express";
import markRouter from "./controllers/mark.js";
import logger from "./utils/logger.js";
import mongoose from "mongoose";
import cors from "cors";
import middleware from "./utils/middleware.js";
import "express-async-errors";
import userRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import testingRouter from "./controllers/testing.js";
import commentRouter from "./controllers/comment.js";
import compression from 'compression'

const app = express();

const { MONGO_URI } = config;

mongoose.set("strictQuery", false);

logger.info("connecting to: ", config.MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

app.use(compression())
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/marks", markRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/comments", commentRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
