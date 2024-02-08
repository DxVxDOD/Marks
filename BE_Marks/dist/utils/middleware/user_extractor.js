"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const config_1 = __importDefault(require("../config"));
const generalParsers_1 = require("../parsers/generalParsers");
const promiseWrapper_1 = require("../promiseWrapper");
const token_extractor_1 = require("./token_extractor");
const userExtractor = async (req, res, next) => {
    const SECRET = (0, generalParsers_1.stringParser)(config_1.default.SECRET);
    const { data: token, error: tokenError } = await (0, promiseWrapper_1.wrapInPromise)((0, token_extractor_1.tokenExtractor)(req, res, next));
    if (!token || tokenError) {
        return res.status(401).json({ error: "{token} " + tokenError });
    }
    const { data: decodedToken, error: decodedTokenError } = await (0, promiseWrapper_1.wrapInPromise)(jsonwebtoken_1.default.verify(token, SECRET));
    if (!decodedToken || decodedTokenError) {
        return res
            .status(401)
            .json({ error: "{decodedToken} " + decodedTokenError });
    }
    const { data: verifiedToken, error: verifiedTokenError } = await (0, promiseWrapper_1.wrapInPromise)((0, generalParsers_1.jwtPayloadParser)(decodedToken));
    if (verifiedTokenError || !verifiedToken) {
        return res
            .status(401)
            .json({ error: "{verifiedToken} " + verifiedTokenError });
    }
    const { data: user, error: userError } = await (0, promiseWrapper_1.wrapInPromise)(userModel_1.default.findById(verifiedToken.id));
    if (userError || !user) {
        return res.status(401).json({
            error: "{Cannot find user in database} " + userError,
        });
    }
    res.locals.user = user;
    next();
};
exports.userExtractor = userExtractor;
//# sourceMappingURL=user_extractor.js.map