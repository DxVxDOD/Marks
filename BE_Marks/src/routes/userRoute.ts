import express, { Response, Request } from "express";
import { getAllUsers } from "../services/userService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
	res.json(getAllUsers());
});

export default router;
