"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService_1 = require("../services/userService");
const promiseWrapper_1 = require("../utils/promiseWrapper");
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    const allUsers = await (0, promiseWrapper_1.wrapInPromise)((0, userService_1.getAllUsers)());
    if (!allUsers.data || allUsers.error) {
        res.status(400).json({ error: allUsers.error });
    }
    res.status(201).json(allUsers.data);
});
router.post("/", async (req, res) => {
    const { data: newUserData, error: newUserError } = await (0, promiseWrapper_1.wrapInPromise)((0, userService_1.postNewUser)(req.body));
    if (newUserError || !newUserData) {
        res.status(400).json({ error: newUserError.message });
    }
    res.status(201).json(newUserData);
});
exports.default = router;
//# sourceMappingURL=userRoute.js.map