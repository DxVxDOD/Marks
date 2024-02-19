"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginService_1 = require("../services/loginService");
const promiseWrapper_1 = require("../utils/promiseWrapper");
const loginRouter = express_1.default.Router();
loginRouter.post("/", async (req, res) => {
    const { data: loginData, error: loginError } = await (0, promiseWrapper_1.wrapInPromise)((0, loginService_1.login)(req.body));
    if (loginError || !loginData) {
        res.status(401).json({ error: loginError.message });
    }
    res.status(200).json(loginData);
});
exports.default = loginRouter;
//# sourceMappingURL=loginRoute.js.map