"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.postNewComment = exports.getCommentById = exports.getAllComments = void 0;
const commentModel_1 = __importDefault(require("../models/commentModel"));
const markModel_1 = __importDefault(require("../models/markModel"));
const commentParser_1 = require("../utils/parsers/commentParser");
const generalParsers_1 = require("../utils/parsers/generalParsers");
const promiseWrapper_1 = require("../utils/promiseWrapper");
const getAllComments = async () => {
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)(commentModel_1.default.find({}).populate("user", { username: 1 }));
    if (!data || error) {
        throw new Error("Error while fetching all comments from database: " + error);
    }
    return data;
};
exports.getAllComments = getAllComments;
const getCommentById = async (id) => {
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)(commentModel_1.default.findById((0, generalParsers_1.stringParser)(id)));
    if (!data || error) {
        throw new Error("Error while fetching comment with provide id: " + error);
    }
};
exports.getCommentById = getCommentById;
const postNewComment = async (obj, user) => {
    const { data: commentData, error: commentError } = await (0, promiseWrapper_1.wrapInPromise)((0, commentParser_1.newCommentParser)(obj));
    if (!commentData || commentError) {
        throw new Error(commentError.message);
    }
    const { data: mark, error: markError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findById(commentData.markId));
    if (!mark || markError) {
        throw new Error("Error while trying to find the Mark you were commenting on: " +
            markError);
    }
    const comment = new commentModel_1.default({
        content: commentData.content,
        markId: mark.id,
        userId: user.id,
        numberOfLikes: 0,
        like: true,
    });
    const { data: savedComment, error: savedCommentError } = await (0, promiseWrapper_1.wrapInPromise)(comment.save());
    if (!savedComment || savedCommentError) {
        throw new Error("Error while saving Comment to the database: " + savedCommentError);
    }
    mark.comments = mark.comments.concat(savedComment.id);
    const { data: updatedMark, error: updatedMarkError } = await (0, promiseWrapper_1.wrapInPromise)(mark.save());
    if (!updatedMark || updatedMarkError) {
        throw new Error("Error while updating Mark with new Comment: " + updatedMarkError);
    }
    return savedComment;
};
exports.postNewComment = postNewComment;
const updateComment = async (comment, userId, markId) => {
    const { data: commentData, error: commentError } = await (0, promiseWrapper_1.wrapInPromise)((0, commentParser_1.commentParser)(comment));
    if (!commentData || commentError) {
        throw new Error(commentError.message);
    }
    const { data: oldCommentData, error: oldCommentError } = await (0, promiseWrapper_1.wrapInPromise)(commentModel_1.default.findById(comment.id));
    if (!oldCommentData || oldCommentError) {
        throw new Error("Cannot find comment to update: " + oldCommentError);
    }
    const { data: markData, error: markError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findById(markId));
    if (!markData || markError) {
        throw new Error("Cannot find mark to comment with provided id: " + markError);
    }
    if (oldCommentData.userId.toString() !== userId) {
        throw new Error("You do not have permission to update this comment");
    }
    const { data: updatedComment, error: updatedCommentError } = await (0, promiseWrapper_1.wrapInPromise)(commentModel_1.default.findByIdAndUpdate(oldCommentData.id, commentData, {
        new: true,
    }));
    if (!updatedComment || updatedCommentError) {
        throw new Error("Error while saving updated comment to data base: " +
            updatedCommentError.message);
    }
    markData.comments = markData.comments
        .filter((com) => com.id !== oldCommentData.id)
        .concat(updatedComment.id);
    const { data: updatedMark, error: updatedMarkError } = await (0, promiseWrapper_1.wrapInPromise)(markData.save());
    if (!updatedMark || updatedMarkError) {
        throw new Error("Failed saving updated comment under Mark: " +
            updatedMarkError.message);
    }
    return updatedComment;
};
exports.updateComment = updateComment;
const deleteComment = async (user, markId, commentId) => {
    const { data: commentData, error: commentError } = await (0, promiseWrapper_1.wrapInPromise)(commentModel_1.default.findById(commentId));
    if (!commentData || commentError) {
        throw new Error("Cannot find comment to be deleted with provided id: " +
            commentError);
    }
    if (commentData.id.toString() !== user.id.toString()) {
        throw new Error("You do not have the permission to delete this comment");
    }
    const deletedComment = await (0, promiseWrapper_1.wrapInPromise)(commentModel_1.default.findByIdAndDelete(commentData.id));
    if (!deletedComment.data || deletedComment.error) {
        throw new Error("Error while deleting comment from database" +
            deletedComment.error.message);
    }
    const { data: markData, error: markError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findById(markId));
    if (!markData || markError) {
        throw new Error("Cannot find Mark to delete comment from with provided id: " +
            markError.message);
    }
    markData.comments = markData.comments.filter((com) => com.id.toString() !== commentData.id.toString());
    const updatedMark = await (0, promiseWrapper_1.wrapInPromise)(markData.save());
    if (!updatedMark.data || updatedMark.error) {
        throw new Error("Error while saving updated comment array without deleted comment in Mark:  " +
            updatedMark.error.message);
    }
    return true;
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=commentService.js.map