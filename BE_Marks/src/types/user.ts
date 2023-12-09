import { Mark } from "./mark";

export type TUser = {
	username: string;
	name: string;
	password: string;
	marks?: Mark[];
};

export type TNewUser = Omit<TUser, "marks">;
