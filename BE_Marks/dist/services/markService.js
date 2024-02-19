"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMark = exports.deleteMark = exports.postNewMark = exports.getMarkById = exports.getAllMarks = void 0;
const markModel_1 = __importDefault(require("../models/markModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generalParsers_1 = require("../utils/parsers/generalParsers");
const markParser_1 = require("../utils/parsers/markParser");
const promiseWrapper_1 = require("../utils/promiseWrapper");
const getAllMarks = async () => {
    const { data: allMarks, error: allMarksError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.find({}).populate("user", { username: 1, name: 1 }));
    if (!allMarks || allMarksError) {
        throw new Error("Error while fetching all Marks from database: " +
            allMarksError.message);
    }
    return allMarks;
};
exports.getAllMarks = getAllMarks;
const getMarkById = async (id) => {
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findById((0, generalParsers_1.stringParser)(id)).populate("user", {
        username: 1,
        name: 1,
    }));
    if (!data || error) {
        throw new Error("Error while fetching mark from database with provided id: " + error);
    }
    return data;
};
exports.getMarkById = getMarkById;
const postNewMark = async (obj, user) => {
    const { data: markData, error: markError } = await (0, promiseWrapper_1.wrapInPromise)((0, markParser_1.newMarkParser)(obj));
    if (!markData || markError) {
        throw new Error(markError.message);
    }
    const mark = new markModel_1.default({
        title: markData.title,
        tag: markData.tag,
        url: markData.url,
        likes: 0,
        user: user.id,
    });
    const { data: savedMark, error: savedMarkError } = await (0, promiseWrapper_1.wrapInPromise)(mark.save());
    if (!savedMark || savedMarkError) {
        throw new Error("Error while saving Marks to database: " + savedMarkError);
    }
    user.marks = user.marks.concat(savedMark._id);
    const { data: updatedUser, error: updatedUserError } = await (0, promiseWrapper_1.wrapInPromise)(user.save());
    if (updatedUserError || !updatedUser) {
        throw new Error("Error while saving user's Mark: " + updatedUserError.message);
    }
    return savedMark;
};
exports.postNewMark = postNewMark;
const deleteMark = async (user, markId) => {
    const { data: mark, error: markError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findById((0, generalParsers_1.stringParser)(markId)));
    if (!mark || markError) {
        throw new Error("Error while trying to fetch Mark with provided id from database: " +
            markError.message);
    }
    if (mark.user.toString() !== user.id.toString()) {
        throw new Error("You do not have the permission to delete this Mark");
    }
    const { data: deleteData, error: deleteError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findByIdAndDelete(markId));
    if (!deleteData || deleteError) {
        throw new Error("Error while finding and deleting Mark: " + deleteError.message);
    }
    user.marks = user.marks.filter((m) => m._id.toString() !== mark._id.toString());
    const updatedUser = await (0, promiseWrapper_1.wrapInPromise)(user.save());
    if (!updatedUser.data || updatedUser.error) {
        throw new Error("Error while updating user after Mark's deletion: " +
            updatedUser.error.message);
    }
    return true;
};
exports.deleteMark = deleteMark;
const updateMark = async (mark, userId, markId) => {
    const { data: markData, error: markError } = await (0, promiseWrapper_1.wrapInPromise)((0, markParser_1.markParser)(mark));
    if (!markData || markError) {
        throw new Error(markError.message);
    }
    const { data: oldMark, error: oldMarkError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findById((0, generalParsers_1.stringParser)(markId)));
    if (!oldMark || oldMarkError) {
        throw new Error("Cannot find Mark with given id in data base: " +
            oldMarkError.message);
    }
    const { data: user, error: userError } = await (0, promiseWrapper_1.wrapInPromise)(userModel_1.default.findById(userId));
    if (!user || userError) {
        throw new Error("Cannot find user in data base based on provided id." +
            userError.message);
    }
    if (oldMark.user.toString() !== user.id) {
        throw new Error("You do not have permission to update this Mark");
    }
    const { data: updatedMark, error: updatedMarkError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findByIdAndUpdate(oldMark.id, markData, { new: true }));
    if (!updatedMark || updatedMarkError) {
        throw new Error("Error while trying to update Mark: " + updatedMarkError.message);
    }
    user.marks = user.marks
        .filter((m) => m.id !== oldMark.id)
        .concat(updatedMark.id);
    const updatedUser = await (0, promiseWrapper_1.wrapInPromise)(user.save());
    if (!updatedUser.data || updatedUser.error) {
        throw new Error("Error while updating user's Mark array with updated Mark: " +
            updatedUser.error.message);
    }
    return updatedMark;
};
exports.updateMark = updateMark;
//# sourceMappingURL=markService.js.map