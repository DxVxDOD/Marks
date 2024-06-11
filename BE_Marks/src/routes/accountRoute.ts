import express, { Response, Request } from "express";
import { wrapInPromise } from "../utils/promiseWrapper";
import { getUserById } from "../services/userService";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  const { data, error } = await wrapInPromise(getUserById(req.params.id));

  if (!data || error) {
    res.status(400).json({ error });
  }

  res.status(200).json(data);
});

export default router;
