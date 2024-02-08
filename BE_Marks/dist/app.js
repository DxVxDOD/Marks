"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const markRoute_1 = __importDefault(require("./routes/markRoute"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const error_handlers_1 = require("./utils/middleware/error_handlers");
const app = (0, express_1.default)();
const MONGO_URI = config_1.default.MONGO_URI;
logger_1.default.info("Connecting to: ", MONGO_URI);
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    logger_1.default.info("Connected to MongoDb");
})
    .catch((error) => {
    if (error instanceof Error) {
        logger_1.default.error("Error connecting to MongoDB: ", error.message);
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("dist"));
app.use(error_handlers_1.requestLogger);
app.use("/api/users", userRoute_1.default);
app.use("/api/login", loginRoute_1.default);
app.use("/api/marks", markRoute_1.default);
app.get("/ping", (_req, res) => {
    console.log("someone pinged here !");
    res.send("Pong!");
});
if (process.env.NODE_ENV === "test") {
    app.use("/api/testing");
}
app.use(error_handlers_1.unknownEndpoint);
app.use(error_handlers_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map