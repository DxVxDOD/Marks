// import Comment from "../models/commentModel";

// const comment = new Comment();

// type Comment = typeof comment;

// export type TComment = Pick<
// 	Comment,
// 	"id" | "markId" | "userId" | "content" | "numberOfLikes" | "like"
// >;

export type TComment = {
	content: string;
	userId: string;
	markId: string;
	id: string;
	numberOfLikes: number;
	like: boolean;
};

export type TNewComment = Pick<TComment, "content" | "markId">;
