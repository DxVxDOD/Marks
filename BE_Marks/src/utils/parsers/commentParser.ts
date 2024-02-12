import { TComment, TNewComment } from "../../types/comment";
import { isComment, isNewComment } from "../typeGuards/isCommentGuards";
import { booleanParser, numberParser, stringParser } from "./generalParsers";

export const commentParser = (obj: Partial<TComment>) => {
	if (isComment(obj)) {
		const comment: TComment = {
			content: stringParser(obj.content),
			markId: stringParser(obj.markId),
			userId: stringParser(obj.userId),
			id: stringParser(obj.id),
			numberOfLikes: numberParser(obj.numberOfLikes),
			like: booleanParser(obj.like),
		};

		return comment;
	}

	throw new Error("Failed parsing Comment");
};

export const newCommentParser = (obj: Partial<TNewComment>) => {
	if (isNewComment(obj)) {
		const comment: TNewComment = {
			content: stringParser(obj.content),
			markId: stringParser(obj.markId),
		};

		return comment;
	}

	throw new Error("Failed parsing Comment");
};
