import { JwtPayload } from "jsonwebtoken";
import { isJwtToken, isString, isUser } from "./typeGuards";
import logger from "./logger";
import { TUser } from "../types/user";

export const jwtPayloadParser = (param: unknown): JwtPayload | string => {
	if (!param || !isString(param) || !isJwtToken(param)) {
		logger.error(param);
		throw new Error("Invalid arguments: " + param);
	}
	return param;
};

export const stringParser = (param: unknown): string => {
	console.log(param);

	if (!param || !isString(param)) {
		logger.error(param);
		throw new Error("Incorrect or missing argument");
	}
	return param;
};

export const usernameParser = () => {};

export const userParser = (obj: unknown): TUser => {
	if (!isUser(obj)) {
		throw new Error("Incorrect data: some fields are missing!");
	}

	const user: TUser = {
		username: stringParser(obj.username),
		name: stringParser(obj.name),
		password: stringParser(obj.password),
		marks: obj.marks,
	};

	return user;
};
