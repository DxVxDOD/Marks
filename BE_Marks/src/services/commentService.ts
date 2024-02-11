import Comment from "../models/commentModel";
import Mark from "../models/markModel";
import { TComment, TNewComment } from "../types/comment";
import { TUser } from "../types/user";
import { newCommentParser } from "../utils/parsers/commentParser";
import { stringParser } from "../utils/parsers/generalParsers";
import { wrapInPromise } from "../utils/promiseWrapper";

export const getAllComments = async () => {
	const { data, error } = await wrapInPromise(Comment.find({}));

	if (!data || error) {
		throw new Error(
			"Error while fetching all comments from database: " + error
		);
	}

	return data;
};

export const getCommentById = async (id: string) => {
	const { data, error } = await wrapInPromise(
		Comment.findById(stringParser(id))
	);

	if (!data || error) {
		throw new Error(
			"Error while fetching comment with provide id: " + error
		);
	}
};

export const postNewComment = async (
	obj: Partial<TNewComment>,
	user: TUser
) => {
	const { data: commentData, error: commentError } = await wrapInPromise(
		newCommentParser(obj)
	);

	if (!commentData || commentError) {
		throw new Error(commentError.message);
	}

	const { data: mark, error: markError } = await wrapInPromise(
		Mark.findById(commentData.markId)
	);

	if (!mark || markError) {
		throw new Error(
			"Error while trying to find the Mark you were commenting on: " +
				markError
		);
	}

	const comment = new Comment({
		content: commentData.content,
		markId: mark.id,
		userId: user.id,
		numberOfLikes: 0,
		like: true,
	});

	const { data: savedComment, error: savedCommentError } =
		await wrapInPromise(comment.save());

	if (!savedComment || savedCommentError) {
		throw new Error(
			"Error while saving Comment to the database: " + savedCommentError
		);
	}

	mark.comments = mark.comments.concat(savedComment.id);

	const { data: updatedMark, error: updatedMarkError } = await wrapInPromise(
		mark.save()
	);

	if (!updatedMark || updatedMarkError) {
		throw new Error(
			"Error while updating Mark with new Comment: " + updatedMarkError
		);
	}

	return savedComment;
};

export const updateComment = async (
	comment: TComment,
	userId: string,
	markId: string
) => {};
