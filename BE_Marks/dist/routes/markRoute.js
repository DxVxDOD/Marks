"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promiseWrapper_1 = require("../utils/promiseWrapper");
const markService_1 = require("../services/markService");
const user_extractor_1 = require("../utils/middleware/user_extractor");
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    const { data: allMarks, error: allMarksError } = await (0, promiseWrapper_1.wrapInPromise)((0, markService_1.getAllMarks)());
    if (!allMarks || allMarksError) {
        res.status(400).json({ error: allMarksError.message });
    }
    res.status(200).json(allMarks);
});
router.get("/:id", async (req, res) => {
    const mark = await (0, promiseWrapper_1.wrapInPromise)((0, markService_1.getMarkById)(req.params.id));
    if (mark.error || !mark.data) {
        res.status(400).json({ error: mark.error.message });
    }
    res.status(200).json(mark.data);
});
router.post("/", user_extractor_1.userExtractor, async (req, res) => {
    const user = res.locals.user;
    const { data: newMark, error: newMarkError } = await (0, promiseWrapper_1.wrapInPromise)((0, markService_1.postNewMark)(req.body, user));
    if (!newMark || newMarkError) {
        res.status(400).json({ error: newMarkError.message });
    }
    res.status(201).json(newMark);
});
router.delete("/:id", user_extractor_1.userExtractor, async (req, res) => {
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)((0, markService_1.deleteMark)(res.locals.user.id, req.params.id));
    if (!data) {
        res.status(401).json({ error: error.message });
    }
    res.status(204).end();
});
router.put("/:id", user_extractor_1.userExtractor, async (req, res) => {
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)((0, markService_1.updateMark)(req.body, res.locals.user.id, req.params.id));
    if (!data) {
        res.status(400).json({ error: error.message });
    }
    res.status(201).json(data);
});
exports.default = router;
//# sourceMappingURL=markRoute.js.map