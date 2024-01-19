import { TNewUser, TUser } from "../../types/user";
import { wrapInPromise } from "../promiseWrapper";
import { isNewUser } from "../typeGuards/userGuards";
import { stringParser } from "./generalParsers";

export const newUserParser = async (obj: Partial<TNewUser>, users: TUser[]) => {
  const checkUser = await wrapInPromise(isNewUser(obj));
  if (checkUser.error || !checkUser.data) {
    throw Error("{checkUser} " + checkUser.error);
  }

  if (obj.password!.length < 3) {
    throw new Error(
      "Password is under 3 characters. Please provide a longer password!",
    );
  }
  if (obj.username!.length < 3) {
    throw new Error(
      "Username is under 3 characters. Please provide a longer username!",
    );
  }

  const username = await stringParser(obj.username);

  const checkUniqueUser = users.find((user) => user.username === username);

  if (checkUniqueUser) {
    throw new Error("This username already exits, please choose another.");
  }

  const newUser = {
    username,
    name: await stringParser(obj.name),
    password: await stringParser(obj.password),
    email: await stringParser(obj.email),
  };

  return newUser;
};