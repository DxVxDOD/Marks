import express, { Request, Response } from "express";
import {
	deleteMark,
	getAllMarks,
	getMarkById,
	postNewMark,
	updateMark,
} from "../services/markService";
import { TUser } from "../types/user";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
	const user: TUser = res.locals.user;
	try {
		const data = await getAllMarks(user);
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.get("/:id", async (req: Request, res: Response) => {
	try {
		const mark = await getMarkById(req.params.id);
		res.status(200).json(mark);
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.post("/", async (req: Request, res: Response) => {
	const user: TUser = res.locals.user;
	try {
		const newMark = await postNewMark(req.body, user);
		res.status(201).json(newMark);
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.put("/:id", async (req: Request, res: Response) => {
	try {
		const data = await updateMark(req.body, res.locals.user.id, req.params.id);
		res.status(201).json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.put("/:id/like", async (req: Request, res: Response) => {
	try {
		const data = await updateMark(req.body, res.locals.user, req.params.id);
		res.status(201).json(data);
	} catch (error) {
		res.status(400).json({ error });
	}
});

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		await deleteMark(res.locals.user, req.params.id);
		res.status(204).end();
	} catch (error) {
		res.status(401).json({ error });
	}
});

export default router;
