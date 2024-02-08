import { TNewUser, TUser } from "../../types/user";
import { isNewUser } from "../typeGuards/userGuards";
import { stringParser } from "./generalParsers";

export const newUserParser = (obj: Partial<TNewUser>, users: TUser[]) => {
	if (!isNewUser(obj)) {
		throw Error(
			"Missing fields or incorrect;y formatted data for new user"
		);
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

	const newUser = {
		username,
		name: stringParser(obj.name),
		password: stringParser(obj.password),
		email: stringParser(obj.email),
	};

	return newUser;
};
