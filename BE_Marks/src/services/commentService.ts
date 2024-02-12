import Comment from "../models/commentModel";
import Mark from "../models/markModel";
import { TComment, TNewComment } from "../types/comment";
import { TUser } from "../types/user";
import {
	commentParser,
	newCommentParser,
} from "../utils/parsers/commentParser";
import { stringParser } from "../utils/parsers/generalParsers";
import { wrapInPromise } from "../utils/promiseWrapper";

export const getAllComments = async () => {
	const { data, error } = await wrapInPromise(
		Comment.find({}).populate("user", { username: 1 })
	);

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
) => {
	const { data: commentData, error: commentError } = await wrapInPromise(
		commentParser(comment)
	);

	if (!commentData || commentError) {
		throw new Error(commentError.message);
	}

	const { data: oldCommentData, error: oldCommentError } =
		await wrapInPromise(Comment.findById(comment.id));

	if (!oldCommentData || oldCommentError) {
		throw new Error("Cannot find comment to update: " + oldCommentError);
	}

	const { data: markData, error: markError } = await wrapInPromise(
		Mark.findById(markId)
	);

	if (!markData || markError) {
		throw new Error(
			"Cannot find mark to comment with provided id: " + markError
		);
	}

	if (oldCommentData.userId.toString() !== userId) {
		throw new Error("You do not have permission to update this comment");
	}

	const { data: updatedComment, error: updatedCommentError } =
		await wrapInPromise(
			Comment.findByIdAndUpdate(oldCommentData.id, commentData, {
				new: true,
			})
		);

	if (!updatedComment || updatedCommentError) {
		throw new Error(
			"Error while saving updated comment to data base: " +
				updatedCommentError.message
		);
	}

	markData.comments = markData.comments
		.filter((com) => com.id !== oldCommentData.id)
		.concat(updatedComment.id);

	const { data: updatedMark, error: updatedMarkError } = await wrapInPromise(
		markData.save()
	);

	if (!updatedMark || updatedMarkError) {
		throw new Error(
			"Failed saving updated comment under Mark: " +
				updatedMarkError.message
		);
	}

	return updatedComment;
};

export const deleteComment = async (
	user: TUser,
	markId: string | undefined,
	commentId: string | undefined
) => {
	const { data: commentData, error: commentError } = await wrapInPromise(
		Comment.findById(commentId)
	);

	if (!commentData || commentError) {
		throw new Error(
			"Cannot find comment to be deleted with provided id: " +
				commentError
		);
	}

	if (commentData.id.toString() !== user.id.toString()) {
		throw new Error(
			"You do not have the permission to delete this comment"
		);
	}

	const deletedComment = await wrapInPromise(
		Comment.findByIdAndDelete(commentData.id)
	);

	if (!deletedComment.data || deletedComment.error) {
		throw new Error(
			"Error while deleting comment from database" +
				deletedComment.error.message
		);
	}

	const { data: markData, error: markError } = await wrapInPromise(
		Mark.findById(markId)
	);

	if (!markData || markError) {
		throw new Error(
			"Cannot find Mark to delete comment from with provided id: " +
				markError.message
		);
	}

	markData.comments = markData.comments.filter(
		(com) => com.id.toString() !== commentData.id.toString()
	);

	const updatedMark = await wrapInPromise(markData.save());

	if (!updatedMark.data || updatedMark.error) {
		throw new Error(
			"Error while saving updated comment array without deleted comment in Mark:  " +
				updatedMark.error.message
		);
	}

	return true;
};
