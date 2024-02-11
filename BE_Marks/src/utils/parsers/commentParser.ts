import { TNewComment } from "../../types/comment";
import { isNewComment } from "../typeGuards/isCommentGuards";
import { stringParser } from "./generalParsers";

export const newCommentParser = (obj: Partial<TNewComment>) => {
	if (isNewComment(obj)) {
		const newComment: TNewComment = {
			content: stringParser(obj.content),
			markId: stringParser(obj.markId),
		};

		return newComment;
	}

	throw new Error("Failed parsing new Comment");
};
