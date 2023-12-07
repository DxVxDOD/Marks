import { User } from "./user";

export type Mark = {
	title: string;
	tag: string;
	url: string;
	likes: number;
	user: User;
};
