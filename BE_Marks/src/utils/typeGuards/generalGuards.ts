import { JwtPayload } from "jsonwebtoken";
import { TCredentials } from "../../types/credentials";

export const isString = (param: unknown): param is string => {
	return typeof param === "string" || param instanceof String;
};

export const isJwtPayload = (param: unknown): param is JwtPayload => {
	return (param as JwtPayload).iat !== undefined;
};

export const isDate = (date: string) => {
	return Boolean(Date.parse(date));
};

export const isCredentials = (obj: Partial<TCredentials>) => {
	if (typeof obj !== "object" || !obj) {
		throw new Error("Error object does not exist" + obj);
	}
	const schema: Record<keyof TCredentials, string> = {
		username: "string",
		password: "string",
	};
	const missingProperties = Object.keys(schema)
		.filter((key) => obj[key as keyof Partial<TCredentials>] === undefined)
		.map((key) => key as keyof TCredentials)
		.map((key) => {
			throw new Error(`Object is missing: ${key} ${schema[key]}`);
		});

	return missingProperties.length === 0;
};

export const isNumber = (num: unknown): num is number => {
	return typeof num === "number" || num instanceof Number;
};
