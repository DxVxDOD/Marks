"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isCredentials = exports.isDate = exports.isJwtPayload = exports.isString = void 0;
const isString = (param) => {
    return typeof param === "string" || param instanceof String;
};
exports.isString = isString;
const isJwtPayload = (param) => {
    return param.iat !== undefined;
};
exports.isJwtPayload = isJwtPayload;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.isDate = isDate;
const isCredentials = (obj) => {
    if (typeof obj !== "object" || !obj) {
        throw new Error("Error object does not exist" + obj);
    }
    const schema = {
        username: "string",
        password: "string",
    };
    const missingProperties = Object.keys(schema)
        .filter((key) => obj[key] === undefined)
        .map((key) => key)
        .map((key) => {
        throw new Error(`Object is missing: ${key} ${schema[key]}`);
    });
    return missingProperties.length === 0;
};
exports.isCredentials = isCredentials;
const isNumber = (num) => {
    return typeof num === "number" || num instanceof Number;
};
exports.isNumber = isNumber;
//# sourceMappingURL=generalGuards.js.map