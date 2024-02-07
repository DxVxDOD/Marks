import express, { Response, Request } from "express";
import { getAllUsers, postNewUser } from "../services/userService";
import { wrapInPromise } from "../utils/promiseWrapper";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const allUsers = await wrapInPromise(getAllUsers());

  if (!allUsers.data || allUsers.error) {
    res.status(400).json({ error: allUsers.error });
  }

  res.status(201).json(allUsers.data);
});

router.post("/", async (req: Request, res: Response) => {
  const { data: newUserData, error: newUserError } = await wrapInPromise(
    postNewUser(req.body),
  );

  if (newUserError || !newUserData) {
    res.status(400).json({ error: newUserError.message });
  }

  res.status(201).json(newUserData);
});

export default router;
