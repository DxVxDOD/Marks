import { TMark } from "./mark";

export type TUser = {
  username: string;
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  id: string;
  marks?: TMark[];
};

export type TNewUser = Omit<TUser, "marks" | "createdAt" | "id">;
export type TUserMarks = Pick<TUser, "username" | "name">;
