import express, { Request, Response } from "express";
import { getAllUsers, postNewUser } from "../services/userService";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
	try {
		const data = await getAllUsers();
		res.status(201).json(data);
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const data = await postNewUser(req.body);
		res.status(201).json(data);
	} catch (err) {
		res.status(400).json({ error: (err as Error).message });
	}
});

export default router;
