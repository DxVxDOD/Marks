import mongoose from "mongoose";

export type TMark = {
  title: string;
  tag: string;
  url: string;
  likes: number;
  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: "User";
  };
} & mongoose.Document;
