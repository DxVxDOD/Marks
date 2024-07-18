import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import accountRoute from "./routes/accountRoute";
import loginRoute from "./routes/loginRoute";
import markRoute from "./routes/markRoute";
import config from "./utils/config";
import logger from "./utils/logger";
import {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} from "./utils/middleware/error_handlers";

const app = express();

const MONGO_URI = config.MONGO_URI;

logger.info("Connecting to: ", MONGO_URI);

mongoose
  .connect(MONGO_URI!)
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

function lol() { }

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing");
}

app.use("/api/login", loginRoute);
app.use("/api/account", accountRoute);
app.use("/api/marks", markRoute);

app.get("/*", (_req, res) => {
  res.sendFile("/index.html", { root: "./dist" });
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
