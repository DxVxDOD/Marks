"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMark = exports.deleteMark = exports.getMarkById = exports.postNewMark = exports.getAllMarks = void 0;
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
        throw new Error("Error while saving Marks to database: " + savedMarkError.message);
    }
    user.marks = user.marks.concat(savedMark._id);
    const { data: updatedUser, error: updatedUserError } = await (0, promiseWrapper_1.wrapInPromise)(user.save());
    if (updatedUserError || !updatedUser) {
        throw new Error("Error while saving user's Mark: " + updatedUserError.message);
    }
    return savedMark;
};
exports.postNewMark = postNewMark;
const getMarkById = async (id) => {
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findById((0, generalParsers_1.stringParser)(id)));
    if (!data || error) {
        throw new Error("Error while fetching user from database with provided id: " +
            error.message);
    }
    return data;
};
exports.getMarkById = getMarkById;
const deleteMark = async (userId, markId) => {
    const { data: user, error: userError } = await (0, promiseWrapper_1.wrapInPromise)(userModel_1.default.findById((0, generalParsers_1.stringParser)(userId)));
    const { data: mark, error: markError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findById((0, generalParsers_1.stringParser)(markId)));
    if (!mark || markError) {
        throw new Error("Error while trying to fetch Mark with provided id from database: " +
            markError.message);
    }
    if (!user || userError) {
        throw new Error("Error while trying to fetch user with provided id from database: " +
            userError.message);
    }
    if (mark.user.toString() !== user.id.toString()) {
        throw new Error("You do not have the permission to delete this Mark");
    }
    user.marks = user.marks.filter((m) => m._id.toString() !== mark._id.toString());
    const { data: deleteData, error: deleteError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findByIdAndDelete(markId));
    const updatedUser = await (0, promiseWrapper_1.wrapInPromise)(user.save());
    if (!updatedUser.data || updatedUser.error) {
        throw new Error("Error while updating user after Mark's deletion: " +
            updatedUser.error.message);
    }
    if (!deleteData || deleteError) {
        throw new Error("Error while finding and deleting Mark: " + deleteError.message);
    }
    return true;
};
exports.deleteMark = deleteMark;
const updateMark = async (mark, userId, markId) => {
    const { data: newMarkData, error: newMarkError } = await (0, promiseWrapper_1.wrapInPromise)((0, markParser_1.markParser)(mark));
    if (!newMarkData || newMarkError) {
        throw new Error(newMarkError.message);
    }
    const user = await (0, promiseWrapper_1.wrapInPromise)(userModel_1.default.findById((0, generalParsers_1.stringParser)(userId)));
    if (!user.data || user.error) {
        throw new Error("Token is invalid: " + user.error.message);
    }
    const { data: oldMark, error: oldMarkError } = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findById((0, generalParsers_1.stringParser)(markId)));
    if (!oldMark || oldMarkError) {
        throw new Error("Cannot find Mark with given id in data base: " +
            oldMarkError.message);
    }
    if (oldMark.user.toString() !== user.data.id) {
        throw new Error("You do not have permission to update this Mark");
    }
    const updatedMark = await (0, promiseWrapper_1.wrapInPromise)(markModel_1.default.findByIdAndUpdate(oldMark.id, newMarkData, { new: true }));
    if (!updatedMark.data || updatedMark.error) {
        throw new Error("Error while trying to update Mark: " + updatedMark.error.message);
    }
    return updatedMark.data;
};
exports.updateMark = updateMark;
//# sourceMappingURL=markService.js.map