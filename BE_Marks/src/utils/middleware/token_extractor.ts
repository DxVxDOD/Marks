import { Request, Response } from "express";

export const tokenExtractor = (req: Request, _res: Response) => {
  const auth = req.get("authorization");
  if (!auth) {
    throw new Error("Incorrect header");
  }
  if (!auth.startsWith("Bearer ")) {
    throw new Error("Provided header is formatted Incorrectly");
  }

  return auth.replace("Bearer ", "");
};
