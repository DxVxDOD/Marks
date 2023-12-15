import express, { Request, Response } from "express";
import { wrapInPromise } from "../utils/promiseWrapper";
import { getAllMarks, postNewMark } from "../services/markService";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { data: allMarks, error: allMarksError } =
    await wrapInPromise(getAllMarks());

  if (!allMarks || allMarksError) {
    res.status(400).json({ error: allMarksError });
  }

  res.status(200).json(allMarks);
});

router.post("/", async (req: Request, res: Response) => {
  const user = res.locals.user;

  const { data: newMark, error: newMarkError } = await wrapInPromise(
    postNewMark(user, req.body),
  );

  if (!newMark || newMarkError) {
    res.status(400).json({ error: newMarkError });
  }
});

export default router;
