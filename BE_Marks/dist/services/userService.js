"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNewUser = exports.getUserById = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generalParsers_1 = require("../utils/parsers/generalParsers");
const userParser_1 = require("../utils/parsers/userParser");
const promiseWrapper_1 = require("../utils/promiseWrapper");
const getAllUsers = async () => {
    const { data: allUserData, error: allUserError } = await (0, promiseWrapper_1.wrapInPromise)(userModel_1.default.find({}));
    if (allUserError || !allUserData) {
        throw new Error("Error while fetching all users: " + allUserError.message);
    }
    return allUserData;
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)(userModel_1.default.findById((0, generalParsers_1.stringParser)(id)));
    if (error || !data) {
        throw new Error("Error while fetching user with provided id: " + error.message);
    }
    return data;
};
exports.getUserById = getUserById;
const postNewUser = async (obj) => {
    const { data: allUsersData, error: allUsersError } = await (0, promiseWrapper_1.wrapInPromise)((0, exports.getAllUsers)());
    if (allUsersError || !allUsersData) {
        throw new Error("Error while fetching all users: " + allUsersError.message);
    }
    const { data: userData, error: userError } = await (0, promiseWrapper_1.wrapInPromise)((0, userParser_1.newUserParser)(obj, allUsersData));
    if (userError || !userData) {
        throw new Error("Error while parsing new user data: " + userError.message);
    }
    const { data: passwordHashed, error: passwordHashedError } = await (0, promiseWrapper_1.wrapInPromise)(bcrypt_1.default.hash((0, generalParsers_1.stringParser)(obj.password), 10));
    if (passwordHashedError || !passwordHashed) {
        throw new Error("Error while hashing password: " + passwordHashedError.message);
    }
    const user = new userModel_1.default({
        ...userData,
        password: passwordHashed,
    });
    const { data: savedUser, error: savedUserError } = await (0, promiseWrapper_1.wrapInPromise)(user.save());
    if (!savedUser || savedUserError) {
        throw new Error("Error while saving user to database: " + savedUserError.message);
    }
    return savedUser;
};
exports.postNewUser = postNewUser;
//# sourceMappingURL=userService.js.map