import User from "../models/user";
import { TNewUser, TUser } from "../types/user";
import { newUserParser } from "../utils/parsers";
import { wrapInPromise } from "../utils/promiseWrapper";

export const getAllUsers = async () => {
	const { data: allUserData, error: allUserError } = await wrapInPromise<
		TUser[]
	>(User.find({}));

	if (allUserError) {
		throw new Error("Error while fetching all users: " + allUserData);
	}

	return allUserData
}


export const postNewUser = async (obj: Partial<TNewUser>) => {
	const { data: allUsersData, error: allUsersError } = await wrapInPromise<
		TUser[]
	>(getAllUsers());

	if (allUsersError) {
		throw new Error('Error while fetching all users: ' + allUsersError);
	}

	const { data: userData, error: userError } = await wrapInPromise<TNewUser>(
		newUserParser(obj, allUsersData!)
	);

	if (userError) {
    throw new Error(userError);
	}

	const user = new User(userData!);
	const savedUser = await user.save()

	return savedUser;
};
