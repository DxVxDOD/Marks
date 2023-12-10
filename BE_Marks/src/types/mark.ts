import { TUser } from "./user";

export type TMark = {
	title: string;
	tag: string;
	url: string;
	likes: number;
	user: TUser;
	createdAt: Date;
};
