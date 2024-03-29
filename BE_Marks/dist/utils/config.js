"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT } = process.env;
const { SECRET } = process.env;
const { MONGO_URI } = process.env;
exports.default = { PORT, SECRET, MONGO_URI };
//# sourceMappingURL=config.js.map