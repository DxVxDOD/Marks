import express, { type Request, type Response } from "express";
import { login } from "../services/loginService";
import { wrapInPromise } from "../utils/promiseWrapper";

const loginRouter = express.Router();

loginRouter.post("/", async (req: Request, res: Response) => {
  const { data, error } = await wrapInPromise(login(req.body));
  if (data) {
    res.status(200).json(data);
  }
  res.status(401).json({ error });
});

export default loginRouter;
