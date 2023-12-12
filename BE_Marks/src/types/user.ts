import { TMark } from "./mark";

export type TUser = {
  username: string;
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  marks?: TMark[];
};

export type TNewUser = Omit<TUser, "marks">;
