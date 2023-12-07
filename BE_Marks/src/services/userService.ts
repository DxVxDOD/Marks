import User from "../models/user";
import { TUser } from "../types/user";
import { wrapInPromise } from "../utils/promiseWrapper";

export const getAllUsers = async () => {
	const { data: userData, error: userError } = await wrapInPromise<TUser[]>(
		User.find({})
	);

	if (userError) {
		throw new Error("Error while fetching all users: " + userError);
	}

	return userData;
};
