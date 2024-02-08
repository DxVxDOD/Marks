import express, { Request, Response } from "express";
import { wrapInPromise } from "../utils/promiseWrapper";
import {
	deleteMark,
	getAllMarks,
	getMarkById,
	postNewMark,
	updateMark,
} from "../services/markService";
import { userExtractor } from "../utils/middleware/user_extractor";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
	const { data: allMarks, error: allMarksError } = await wrapInPromise(
		getAllMarks()
	);

	if (!allMarks || allMarksError) {
		res.status(400).json({ error: allMarksError.message });
	}

	res.status(200).json(allMarks);
});

router.get("/:id", async (req: Request, res: Response) => {
	const mark = await wrapInPromise(getMarkById(req.params.id));
	if (mark.error || !mark.data) {
		res.status(400).json({ error: mark.error.message });
	}

	res.status(200).json(mark.data);
});

router.post("/", userExtractor, async (req: Request, res: Response) => {
	const user = res.locals.user;

	const { data: newMark, error: newMarkError } = await wrapInPromise(
		postNewMark(req.body, user)
	);

	if (!newMark || newMarkError) {
		res.status(400).json({ error: newMarkError.message });
	}

	res.status(201).json(newMark);
});

router.delete("/:id", userExtractor, async (req: Request, res: Response) => {
	const { data, error } = await wrapInPromise(
		deleteMark(res.locals.user.id, req.params.id)
	);

	if (!data) {
		res.status(401).json({ error: error.message });
	}

	res.status(204).end();
});

router.put("/:id", userExtractor, async (req: Request, res: Response) => {
	const { data, error } = await wrapInPromise(
		updateMark(req.body, res.locals.user.id, req.params.id)
	);

	if (!data) {
		res.status(400).json({ error: error.message });
	}

	res.status(201).json(data);
});

export default router;
