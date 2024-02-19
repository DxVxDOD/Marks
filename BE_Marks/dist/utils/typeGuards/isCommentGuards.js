"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComment = exports.isNewComment = void 0;
const isNewComment = (obj) => {
    if (!obj || typeof obj !== "object") {
        throw new Error("Error object does not exist: " + obj);
    }
    const schema = {
        content: "string",
        markId: "string",
    };
    const missingProperties = Object.keys(schema)
        .filter((key) => obj[key] === undefined)
        .map((key) => key)
        .map((key) => {
        throw new Error(`Object is missing: ${key} ${schema[key]}`);
    });
    return missingProperties.length === 0;
};
exports.isNewComment = isNewComment;
const isComment = (obj) => {
    if (!obj || typeof obj !== "object") {
        throw new Error("Error object does not exist: " + obj);
    }
    const schema = {
        content: "string",
        markId: "string",
        userId: "string",
        numberOfLikes: "string",
        like: "boolean",
        id: "string",
    };
    const missingProperties = Object.keys(schema)
        .filter((key) => obj[key] === undefined)
        .map((key) => key)
        .map((key) => {
        throw new Error(`Object is missing: ${key} ${schema[key]}`);
    });
    return missingProperties.length === 0;
};
exports.isComment = isComment;
//# sourceMappingURL=isCommentGuards.js.map