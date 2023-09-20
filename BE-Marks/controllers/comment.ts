import express from "express";
import Comment from "../models/comments.js";
import { TComment } from "../types/comment.js";

const commentRouter = express.Router();

commentRouter.get("/", async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

commentRouter.post("/", async (request, response) => {
  if (request.body === undefined) {
    return response.status(400).json({ error: "Content is missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { content, markId }: TComment = request.body;

  const comment = new Comment({
    content,
    markId,
  });

  const savedComment = await comment.save();

  response.status(201).json(savedComment);
});

export default commentRouter;
