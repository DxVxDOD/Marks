import mongoose from "mongoose";

type TMarkRef = {
  type: mongoose.Schema.Types.ObjectId;
  ref: "Mark";
};

export type TUser = {
  username: string;
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  id: string;
  marks: TMarkRef[];
};

export type TNewUser = Omit<TUser, "marks" | "createdAt" | "id">;
