import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import logger from "./logger";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction,
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
  next: NextFunction,
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
