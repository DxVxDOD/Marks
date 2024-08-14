import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const tokenExtractor = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const auth = req.get("authorization");
  console.log("====>", auth);
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
