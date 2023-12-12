import bycryp from "bcrypt";
import express, { type Request, type Response } from "express";
import User from "../models/user";
import { wrapInPromise } from "../utils/promiseWrapper";

const loginRouter = express.Router();

loginRouter.get("/", (_req: Request, res: Response) => {
  res.send("login route");
});

loginRouter.post("/", async (req: Request, res: Response) => {
  const {} = req.body;

  const { data: userData, error: userError } = await wrapInPromise(
    User.findOne(),
  );
  const correctPassword = await wrapInPromise(bycryp.compare());
});
