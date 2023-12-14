import mongoose from "mongoose";

type TUserRef = {
  type: mongoose.Schema.Types.ObjectId;
  ref: "User";
};

export type TMark = {
  title: string;
  tag: string;
  url: string;
  likes: number;
  user: TUserRef;
  createdAt: Date;
  id: string;
};

export type TNewMark = Pick<TMark, "title" | "tag" | "url">;
