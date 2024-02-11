import express, { Request, Response } from "express";
import { wrapInPromise } from "../utils/promiseWrapper";
import { getAllComments, getCommentById } from "../services/commentService";
import { stringParser } from "../utils/parsers/generalParsers";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
	const { data, error } = await wrapInPromise(getAllComments());

	if (!data || error) {
		res.status(400).json({ error: error.message });
	}

	res.status(200).json(data);
});

router.get("/:id", async (req: Request, res: Response) => {
	const { data, error } = await wrapInPromise(
		getCommentById(stringParser(req.params.id))
	);

	if (!data || error) {
		res.status(400).json({ error: error.message });
	}

	res.status(200).json(data);
});
