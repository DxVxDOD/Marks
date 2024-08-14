"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promiseWrapper_1 = require("../utils/promiseWrapper");
const userService_1 = require("../services/userService");
const router = express_1.default.Router();
router.get("/:id", async (req, res) => {
    const { data, error } = await (0, promiseWrapper_1.wrapInPromise)((0, userService_1.getUserById)(req.params.id));
    if (!data || error) {
        res.status(400).json({ error });
    }
    res.status(200).json(data);
});
exports.default = router;
//# sourceMappingURL=accountRoute.js.map