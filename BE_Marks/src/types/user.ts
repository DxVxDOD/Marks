import User from "../models/userModel";

const user = new User();

export type TUser = typeof user;

export type TNewUser = Pick<TUser, "username" | "name" | "password" | "email">;

export type TUserToFE = Pick<
  TUser,
  "username" | "name" | "email" | "createdAt"
> & {
  token: string;
  marks_length: number;
};
