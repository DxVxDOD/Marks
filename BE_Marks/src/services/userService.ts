import bcrypt from "bcrypt";
import User from "../models/userModel";
import { TNewUser } from "../types/user";
import { stringParser } from "../utils/parsers/generalParsers";
import { newUserParser } from "../utils/parsers/userParser";
import { wrapInPromise } from "../utils/promiseWrapper";

export const getAllUsers = async () => {
	const { data: allUserData, error: allUserError } = await wrapInPromise(
		User.find({})
	);

	if (allUserError || !allUserData) {
		throw new Error(
			"Error while fetching all users: " + allUserError.message
		);
	}

	return allUserData;
};

export const postNewUser = async (obj: Partial<TNewUser>) => {
	const { data: allUsersData, error: allUsersError } = await wrapInPromise(
		getAllUsers()
	);

	if (allUsersError || !allUsersData) {
		throw new Error(
			"Error while fetching all users: " + allUsersError.message
		);
	}

	const { data: userData, error: userError } = await wrapInPromise(
		newUserParser(obj, allUsersData)
	);

	if (userError || !userData) {
		throw new Error(
			"Error while parsing new user data: " + userError.message
		);
	}

	const { data: passwordHashed, error: passwordHashedError } =
		await wrapInPromise(bcrypt.hash(stringParser(obj.password), 10));

	if (passwordHashedError || !passwordHashed) {
		throw new Error(
			"Error while hashing password: " + passwordHashedError.message
		);
	}

	const user = new User({
		...userData,
		password: passwordHashed,
	});

	const { data: savedUser, error: savedUserError } = await wrapInPromise(
		user.save()
	);

	if (!savedUser || savedUserError) {
		throw new Error(
			"Error while saving user to database: " + savedUserError.message
		);
	}

	return savedUser;
};
