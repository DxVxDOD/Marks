import express, { Request, Response, response } from "express";
import { wrapInPromise } from "../utils/promiseWrapper";
import {
	deleteComment,
	getAllComments,
	getCommentById,
	postNewComment,
	updateComment,
} from "../services/commentService";
import { stringParser } from "../utils/parsers/generalParsers";
import { userExtractor } from "../utils/middleware/user_extractor";
import { TUser } from "../types/user";

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

router.post("/", userExtractor, async (req: Request, res: Response) => {
	const user: TUser = res.locals.user;

	const { data: newComment, error: newCommentError } = await wrapInPromise(
		postNewComment(req.body, user)
	);

	if (!newComment || newCommentError) {
		res.status(400).json({ error: newCommentError.message });
	}

	res.status(201).json(newComment);
});

router.put("/:id", userExtractor, async (req: Request, res: Response) => {
	const { data: comment, error: commentError } = await wrapInPromise(
		updateComment(
			req.body,
			stringParser(req.params.id),
			stringParser(response.locals.user.id)
		)
	);

	if (!comment || commentError) {
		res.status(400).json({ error: commentError.message });
	}

	res.status(201).json(comment);
});

// router.patch("/:id", async (req: Request, res: Response) => {

// })

router.delete("/:id", userExtractor, async (req: Request, res: Response) => {
	const user = res.locals.user;

	const { data, error } = await wrapInPromise(
		deleteComment(
			user,
			stringParser(req.body.markId),
			stringParser(req.params.id)
		)
	);
	if (!data || error) {
		res.status(401).json({ error: error.message });
	}

	res.status(204).end();
});

export default router;
