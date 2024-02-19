"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const promiseWrapper_1 = require("../utils/promiseWrapper");
const commentService_1 = require("../services/commentService");
const generalParsers_1 = require("../utils/parsers/generalParsers");
const user_extractor_1 = require("../utils/middleware/user_extractor");
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)((0, commentService_1.getAllComments)());
    if (!data || error) {
        res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);
});
router.get("/:id", async (req, res) => {
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)((0, commentService_1.getCommentById)((0, generalParsers_1.stringParser)(req.params.id)));
    if (!data || error) {
        res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);
});
router.post("/", user_extractor_1.userExtractor, async (req, res) => {
    const user = res.locals.user;
    const { data: newComment, error: newCommentError } = await (0, promiseWrapper_1.wrapInPromise)((0, commentService_1.postNewComment)(req.body, user));
    if (!newComment || newCommentError) {
        res.status(400).json({ error: newCommentError.message });
    }
    res.status(201).json(newComment);
});
router.put("/:id", user_extractor_1.userExtractor, async (req, res) => {
    const { data: comment, error: commentError } = await (0, promiseWrapper_1.wrapInPromise)((0, commentService_1.updateComment)(req.body, (0, generalParsers_1.stringParser)(req.params.id), (0, generalParsers_1.stringParser)(express_1.response.locals.user.id)));
    if (!comment || commentError) {
        res.status(400).json({ error: commentError.message });
    }
    res.status(201).json(comment);
});
// router.patch("/:id", async (req: Request, res: Response) => {
// })
router.delete("/:id", user_extractor_1.userExtractor, async (req, res) => {
    const user = res.locals.user;
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)((0, commentService_1.deleteComment)(user, (0, generalParsers_1.stringParser)(req.body.markId), (0, generalParsers_1.stringParser)(req.params.id)));
    if (!data || error) {
        res.status(401).json({ error: error.message });
    }
    res.status(204).end();
});
exports.default = router;
//# sourceMappingURL=commentRoute.js.map