import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../types/user";

export const isString = (param: unknown): param is string => {
	return typeof param === "string" || param instanceof String;
};

export const isJwtToken = (param: unknown): param is JwtPayload => {
	return (param as JwtPayload).aud !== undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isUser = (obj: any): obj is TUser => {
	if (!obj || typeof obj === "object") {
		throw new Error("Error object does not exist" + obj);
	}

	const schema: Record<keyof TUser, string> = {
		username: "string",
		name: "string",
		password: "string",
		marks: "Mark[]",
	};
	const missingProperties = Object.keys(schema)
		.filter((key) => obj[key] === undefined)
		.map((key) => key as keyof TUser)
		.map((key) => {
			throw new Error(`Object is missing: ${key} ${schema[key]}`);
		});

	return missingProperties.length === 0;
};
