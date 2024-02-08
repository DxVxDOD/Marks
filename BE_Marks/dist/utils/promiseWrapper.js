"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapInPromise = void 0;
const logger_1 = __importDefault(require("./logger"));
const wrapInPromise = async (func) => {
    const [result] = await Promise.allSettled([func]);
    if (result.status === "rejected") {
        logger_1.default.error(result.reason);
        return { data: undefined, error: result.reason };
    }
    return { data: result.value, error: undefined };
};
exports.wrapInPromise = wrapInPromise;
//# sourceMappingURL=promiseWrapper.js.map