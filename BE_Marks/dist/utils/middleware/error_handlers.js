"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.unknownEndpoint = exports.requestLogger = void 0;
const logger_1 = __importDefault(require("../logger"));
const requestLogger = (req, _res, next) => {
    logger_1.default.info("Method", req.method);
    logger_1.default.info("Path", req.path);
    logger_1.default.info("Body", req.body);
    logger_1.default.info("---");
    next();
};
exports.requestLogger = requestLogger;
const unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: "unknown endpoint" });
};
exports.unknownEndpoint = unknownEndpoint;
const errorHandler = (error, _req, res, next) => {
    logger_1.default.error(error.message);
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
exports.errorHandler = errorHandler;
//# sourceMappingURL=error_handlers.js.map