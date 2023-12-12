import express, { Response, Request } from "express";
import { getAllUsers, postNewUser } from "../services/userService";
import { wrapInPromise } from "../utils/promiseWrapper";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.send(users);
  // res.json(getAllUsers());
});

router.post("/", async (req: Request, res: Response) => {
  const { data: newUserData, error: newUserError } = await wrapInPromise(
    postNewUser(req.body),
  );

  if (newUserError) {
    res.status(400).json({ error: newUserError.message });
  }

  res.status(201).json(newUserData!);
});

export default router;
