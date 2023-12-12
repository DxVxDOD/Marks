import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import logger from "./logger";
import jsonwebtoken from "jsonwebtoken";
import config from "./config";

export const requestLogger = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	logger.info("Method", req.method);
	logger.info("Path", req.path);
	logger.info("Body", req.body);
	logger.info("---");
	next();
};

export const unknownEndpoint = (_req: Request, res: Response) => {
	res.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler: ErrorRequestHandler = (
	error: Error,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return res.status(400).send({ error: "malformed id" });
	}

	if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	}

	if (error.name === "JsonWebTokenError") {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};

export const tokenExtractor = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	const auth = req.get("authorization");

	if (auth?.startsWith("Bearer ")) return auth.replace("Bearer ", "");

	next();
};

export const userExtractor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const decodedToken = jsonwebtoken.verify(
		tokenExtractor(req, res, next)!,
		config.SECRET!
	);

	if (decodedToken) {
		return res.status(401);
	}
};