"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markParser = exports.newMarkParser = void 0;
const markGuards_1 = require("../typeGuards/markGuards");
const generalParsers_1 = require("./generalParsers");
const newMarkParser = (obj) => {
    if ((0, markGuards_1.isNewMark)(obj)) {
        const newMark = {
            tag: (0, generalParsers_1.stringParser)(obj.tag),
            url: (0, generalParsers_1.stringParser)(obj.url),
            title: (0, generalParsers_1.stringParser)(obj.title),
        };
        return newMark;
    }
    throw new Error("Failed parsing new Mark");
};
exports.newMarkParser = newMarkParser;
const markParser = (obj) => {
    if ((0, markGuards_1.isMarkFromFE)(obj)) {
        const mark = {
            title: (0, generalParsers_1.stringParser)(obj.title),
            tag: (0, generalParsers_1.stringParser)(obj.tag),
            url: (0, generalParsers_1.stringParser)(obj.url),
            likes: (0, generalParsers_1.numberParser)(obj.likes),
        };
        return mark;
    }
    throw new Error("Failed parsing Mark");
};
exports.markParser = markParser;
//# sourceMappingURL=markParser.js.map