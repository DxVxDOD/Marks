"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNewUser = void 0;
const isNewUser = (obj) => {
    if (!obj || typeof obj !== "object") {
        throw new Error("Error object does not exist" + obj);
    }
    const schema = {
        username: "string",
        name: "string",
        password: "string",
        email: "string",
    };
    const missingProperties = Object.keys(schema)
        .filter((key) => obj[key] === undefined)
        .map((key) => key)
        .map((key) => {
        throw new Error(`Object is missing: ${key} ${schema[key]}`);
    });
    return missingProperties.length === 0;
};
exports.isNewUser = isNewUser;
//# sourceMappingURL=userGuards.js.map