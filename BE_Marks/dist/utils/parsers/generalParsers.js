"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booleanParser = exports.numberParser = exports.dateParser = exports.stringParser = exports.jwtPayloadParser = void 0;
const generalGuards_1 = require("../typeGuards/generalGuards");
const generalGuards_2 = require("../typeGuards/generalGuards");
const jwtPayloadParser = (param) => {
    if ((0, generalGuards_2.isJwtPayload)(param)) {
        return param;
    }
    throw new Error("while parsing provided token: " + param);
};
exports.jwtPayloadParser = jwtPayloadParser;
const stringParser = (param) => {
    if (!param || !(0, generalGuards_2.isString)(param)) {
        throw new Error(`${param} is not a string.`);
    }
    return param;
};
exports.stringParser = stringParser;
const dateParser = (date) => {
    if (!date || !(0, generalGuards_2.isString)(date) || !(0, generalGuards_1.isDate)(date)) {
        throw new Error("Incorrect or missing date" + date);
    }
    return date;
};
exports.dateParser = dateParser;
const numberParser = (num) => {
    if (num === 0) {
        return num;
    }
    if (!num || !(0, generalGuards_1.isNumber)(num)) {
        throw new Error(`${num} is not a number`);
    }
    return num;
};
exports.numberParser = numberParser;
const booleanParser = (obj) => {
    if (!obj || !(0, generalGuards_1.isBoolean)(obj)) {
        throw new Error(`${obj} is not a number`);
    }
    return obj;
};
exports.booleanParser = booleanParser;
//# sourceMappingURL=generalParsers.js.map