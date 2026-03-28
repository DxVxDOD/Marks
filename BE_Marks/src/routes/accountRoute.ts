import express, { Request, Response } from "express";
import { getUserById } from "../services/userService";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const data = await getUserById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
