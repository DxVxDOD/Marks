import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { TCredentials } from "../types/credentials";
import config from "../utils/config";
import { stringParser } from "../utils/parsers/generalParsers";
import { wrapInPromise } from "../utils/promiseWrapper";
import { isCredentials } from "../utils/typeGuards/generalGuards";

export const login = async (obj: Partial<TCredentials>) => {
	const checkCredentials = await wrapInPromise(isCredentials(obj));
	if (checkCredentials.error) {
		return checkCredentials.error;
	}

	const { username, password }: TCredentials = {
		username: await stringParser(obj.username),
		password: await stringParser(obj.password),
	};

	const { data: userData, error: userError } = await wrapInPromise(
		User.findOne({ username })
	);

	if (userError || !userData) {
		throw new Error("Error while fetching user: " + userError);
	}

	const correctPassword = await wrapInPromise(
		bcrypt.compare(password, userData.password)
	);

	if (correctPassword.data === false) {
		throw new Error("Error wrong password provided");
	}

	const userForToken = {
		username: userData.username,
		id: userData.id,
	};

	const SECRET = await stringParser(config.SECRET);

	const token = jwt.sign(userForToken, SECRET);

	return {
		username: userData.username,
		token: token,
		name: userData.name,
	};
};
