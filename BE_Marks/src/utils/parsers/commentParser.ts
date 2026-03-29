import { TComment, TNewComment } from "../../types/comment";
import { isComment, isNewComment } from "../typeGuards/isCommentGuards";
import { booleanParser, numberParser, stringParser } from "./generalParsers";

export const commentParser = (obj: Partial<TComment>): TComment => {
	if (isComment(obj)) {
		return {
			content: stringParser(obj.content),
			markId: stringParser(obj.markId),
			userId: stringParser(obj.userId),
			id: stringParser(obj.id),
			numberOfLikes: numberParser(obj.numberOfLikes),
			like: booleanParser(obj.like),
		};
	}
	throw new Error("Failed parsing Comment");
};

export const newCommentParser = (obj: Partial<TNewComment>): TNewComment => {
	if (isNewComment(obj)) {
		return {
			content: stringParser(obj.content),
			markId: stringParser(obj.markId),
		};
	}

	throw new Error("Failed parsing Comment");
};
