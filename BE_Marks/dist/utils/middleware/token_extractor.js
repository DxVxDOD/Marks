"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenExtractor = void 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tokenExtractor = (req, _res, next) => {
    const auth = req.get("authorization");
    if (!auth) {
        throw new Error("Incorrect header");
    }
    if (!auth.startsWith("Bearer ")) {
        throw new Error("Provided header is formatted Incorrectly");
    }
    if (auth.startsWith("Bearer ")) {
        return auth.replace("Bearer ", "");
    }
    next();
};
exports.tokenExtractor = tokenExtractor;
//# sourceMappingURL=token_extractor.js.map