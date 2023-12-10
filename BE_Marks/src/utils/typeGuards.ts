import { JwtPayload } from "jsonwebtoken";
import { TNewUser } from "../types/user";

export const isString = (param: unknown): param is string => {
	return typeof param === "string" || param instanceof String;
};

export const isJwtToken = (param: unknown): param is JwtPayload => {
	return (param as JwtPayload).aud !== undefined;
};

export const isUser = (obj: Partial<TNewUser>): obj is TNewUser => {
	if (!obj || typeof obj !== "object") {
		throw new Error("Error object does not exist" + obj);
	}

	const schema: Record<keyof TNewUser, string> = {
		username: "string",
		name: "string",
		password: "string",
		email: "string",
	};
	const missingProperties = Object.keys(schema)
		.filter((key) => obj[key as keyof TNewUser] === undefined)
		.map((key) => key as keyof TNewUser)
		.map((key) => {
			throw new Error(`Object is missing: ${key} ${schema[key]}`);
		});

	console.log(missingProperties);

	return missingProperties.length === 0;
};

export const isDate = (date: string) => {
	return Boolean(Date.parse(date));
};
