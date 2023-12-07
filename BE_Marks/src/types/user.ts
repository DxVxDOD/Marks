import { Mark } from "./mark";

export type TUser = {
	username: string;
	name: string;
	password: string;
	marks: Mark[];
};
