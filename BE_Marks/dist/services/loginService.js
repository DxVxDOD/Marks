"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const config_1 = __importDefault(require("../utils/config"));
const generalParsers_1 = require("../utils/parsers/generalParsers");
const promiseWrapper_1 = require("../utils/promiseWrapper");
const generalGuards_1 = require("../utils/typeGuards/generalGuards");
const login = async (obj) => {
    if (!(0, generalGuards_1.isCredentials)(obj)) {
        throw new Error("Wrong fields provided for credentials");
    }
    const { username, password } = {
        username: (0, generalParsers_1.stringParser)(obj.username),
        password: (0, generalParsers_1.stringParser)(obj.password),
    };
    const { data: userData, error: userError } = await (0, promiseWrapper_1.wrapInPromise)(userModel_1.default.findOne({ username }));
    if (userError || !userData) {
        throw new Error("Error while fetching user by username: " + userError.message);
    }
    const correctPassword = await (0, promiseWrapper_1.wrapInPromise)(bcrypt_1.default.compare(password, userData.password));
    if (!correctPassword.data || correctPassword.error) {
        throw new Error("Error wrong password provided: " + correctPassword.error.message);
    }
    const userForToken = {
        username: userData.username,
        id: userData.id,
    };
    const SECRET = (0, generalParsers_1.stringParser)(config_1.default.SECRET);
    const token = jsonwebtoken_1.default.sign(userForToken, SECRET);
    return {
        username: userData.username,
        token: token,
        name: userData.name,
    };
};
exports.login = login;
//# sourceMappingURL=loginService.js.map