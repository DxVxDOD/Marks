"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserParser = void 0;
const userGuards_1 = require("../typeGuards/userGuards");
const generalParsers_1 = require("./generalParsers");
const newUserParser = (obj, users) => {
    if (!(0, userGuards_1.isNewUser)(obj)) {
        throw Error("Missing fields or incorrect;y formatted data for new user");
    }
    if (obj.password.length < 3) {
        throw new Error("Password is under 3 characters. Please provide a longer password!");
    }
    if (obj.username.length < 3) {
        throw new Error("Username is under 3 characters. Please provide a longer username!");
    }
    const username = (0, generalParsers_1.stringParser)(obj.username);
    const checkUniqueUser = users.find((user) => user.username === username);
    if (checkUniqueUser) {
        throw new Error("This username already exits, please choose another.");
    }
    const newUser = {
        username,
        name: (0, generalParsers_1.stringParser)(obj.name),
        password: (0, generalParsers_1.stringParser)(obj.password),
        email: (0, generalParsers_1.stringParser)(obj.email),
    };
    return newUser;
};
exports.newUserParser = newUserParser;
//# sourceMappingURL=userParser.js.map