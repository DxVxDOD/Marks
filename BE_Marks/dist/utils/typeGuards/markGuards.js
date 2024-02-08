"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMarkFromFE = exports.isNewMark = void 0;
const isNewMark = (obj) => {
    if (!obj || typeof obj !== "object") {
        throw new Error("Error object does not exist: " + obj);
    }
    const schema = {
        tag: "string",
        url: "string",
        title: "string",
    };
    const missingProperties = Object.keys(schema)
        .filter((key) => obj[key] === undefined)
        .map((key) => key)
        .map((key) => {
        throw new Error(`Object is missing: ${key} ${schema[key]}`);
    });
    return missingProperties.length === 0;
};
exports.isNewMark = isNewMark;
const isMarkFromFE = (obj) => {
    if (!obj || typeof obj !== "object") {
        throw new Error("Error object does not exist" + obj);
    }
    const schema = {
        tag: "string",
        url: "string",
        title: "string",
        likes: "number",
    };
    const missingProperties = Object.keys(schema)
        .filter((key) => obj[key] === undefined)
        .map((key) => key)
        .map((key) => {
        throw new Error(`Object is missing: ${key} ${schema[key]}`);
    });
    return missingProperties.length === 0;
};
exports.isMarkFromFE = isMarkFromFE;
//# sourceMappingURL=markGuards.js.map