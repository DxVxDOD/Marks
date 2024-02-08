import express, { type Request, type Response } from "express";
import { login } from "../services/loginService";
import { wrapInPromise } from "../utils/promiseWrapper";

const loginRouter = express.Router();

loginRouter.get("/", (_req: Request, res: Response) => {
  res.send("login route");
});

loginRouter.post("/", async (req: Request, res: Response) => {
  const { data: loginData, error: loginError } = await wrapInPromise(
    login(req.body),
  );

  if (loginError || !loginData) {
    res.status(401).json({ error: loginError.message });
  }

  res.status(200).json(loginData);
});

export default loginRouter;
