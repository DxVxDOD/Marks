import { isJwtToken, isString, isUser } from "./typeGuards";
import logger from "./logger";
import { TNewUser, TUser } from "../types/user";
import bcrypt from "bcrypt";
import { wrapInPromise } from "./promiseWrapper";
import { isDate } from "util/types";

export const jwtPayloadParser = (param: unknown) => {
	if (!param || !isString(param) || !isJwtToken(param)) {
		logger.error(param);
		throw new Error("Invalid arguments: " + param);
	}
	return param;
};

export const stringParser = (param: unknown) => {
	console.log(param);

	if (!param || !isString(param)) {
		logger.error(param);
		throw new Error(`${param} is not a string.`);
	}
	return param;
};

export const newUserParser = async (obj: Partial<TNewUser>, users: TUser[]) => {
	const checkUser = await wrapInPromise(isUser(obj));
	if (checkUser.error) {
		throw new Error(checkUser.error);
	}

	if (obj.password!.length < 3) {
		throw new Error(
			"Password is under 3 characters. Please provide a longer password!"
		);
	}
	if (obj.username!.length < 3) {
		throw new Error(
			"Username is under 3 characters. Please provide a longer username!"
		);
	}

	const username = stringParser(obj.username);

	const checkUniqueUser = users.find((user) => user.username === username);

	if (checkUniqueUser) {
		throw new Error("This username already exits, please choose another.");
	}

	const { data: passwordHashed, error: passwordHashedError } =
		await wrapInPromise<string>(
			bcrypt.hash(stringParser(obj.password), 10)
		);

	if (passwordHashedError) {
		throw new Error("Error while hashing password: " + passwordHashedError);
	}

	const user: TNewUser = {
		username,
		name: stringParser(obj.name),
		password: passwordHashed!,
		email: stringParser(obj.email),
	};

	return user;
};

export const dateParser = (date: unknown) => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error("Incorrect or missing date" + date);
	}
	return date;
};
