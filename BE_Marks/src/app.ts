import express from "express";
import cors from "cors";
import config from "./utils/config";
import logger from "./utils/logger";
import mongoose from "mongoose";
import { parseString } from "./utils/parsers";
import {
	errorHandler,
	requestLogger,
	unknownEndpoint,
} from "./utils/middleware";

export const app = express();

const MONGO_URI = parseString(config.MONGO_URI);

logger.info("Connecting to: ", MONGO_URI);

mongoose
	.connect(MONGO_URI)
	.then(() => {
		logger.info("Connected to MongoDb");
	})
	.catch((error) => {
		if (error instanceof Error) {
			logger.error("Error connecting to MongoDB ", error.message);
		}
	});

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(requestLogger);

app.get("/ping", (_req, res) => {
	console.log("someone pinged here !");
	res.send("Pong!");
});

if (process.env.NODE_ENV === "test") {
	app.use("/api/testing");
}

app.use(unknownEndpoint);
app.use(errorHandler);
