import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import loginRoute from "./routes/loginRoute";
import markRoute from "./routes/markRoute";
import config from "./utils/config";
import logger from "./utils/logger";
import {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} from "./utils/middleware";
import { stringParser } from "./utils/parsers/generalParsers";

const app = express();

const MONGO_URI = stringParser(config.MONGO_URI);

logger.info("Connecting to: ", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info("Connected to MongoDb");
  })
  .catch((error) => {
    if (error instanceof Error) {
      logger.error("Error connecting to MongoDB: ", error.message);
    }
  });

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(requestLogger);

app.use("/api/users", userRoute);
app.use("/api/login", loginRoute);
app.use("/api/marks", markRoute);

app.get("/ping", (_req, res) => {
  console.log("someone pinged here !");
  res.send("Pong!");
});

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing");
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
