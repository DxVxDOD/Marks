import Comment from "../models/commentModel";

const comment = new Comment();

export type TComment = typeof comment & {
  id: string;
};
