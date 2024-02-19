"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCommentParser = exports.commentParser = void 0;
const isCommentGuards_1 = require("../typeGuards/isCommentGuards");
const generalParsers_1 = require("./generalParsers");
const commentParser = (obj) => {
    if ((0, isCommentGuards_1.isComment)(obj)) {
        const comment = {
            content: (0, generalParsers_1.stringParser)(obj.content),
            markId: (0, generalParsers_1.stringParser)(obj.markId),
            userId: (0, generalParsers_1.stringParser)(obj.userId),
            id: (0, generalParsers_1.stringParser)(obj.id),
            numberOfLikes: (0, generalParsers_1.numberParser)(obj.numberOfLikes),
            like: (0, generalParsers_1.booleanParser)(obj.like),
        };
        return comment;
    }
    throw new Error("Failed parsing Comment");
};
exports.commentParser = commentParser;
const newCommentParser = (obj) => {
    if ((0, isCommentGuards_1.isNewComment)(obj)) {
        const comment = {
            content: (0, generalParsers_1.stringParser)(obj.content),
            markId: (0, generalParsers_1.stringParser)(obj.markId),
        };
        return comment;
    }
    throw new Error("Failed parsing Comment");
};
exports.newCommentParser = newCommentParser;
//# sourceMappingURL=commentParser.js.map