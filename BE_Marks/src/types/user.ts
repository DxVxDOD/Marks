import User from "../models/userModel";

const user = new User();

export type TUser = typeof user;

export type TNewUser = Pick<TUser, "username" | "name" | "password" | "email">;
