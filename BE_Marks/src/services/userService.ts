import bcrypt from "bcrypt";
import User from "../models/userModel";
import { TNewUser, TUser } from "../types/user";
import { stringParser } from "../utils/parsers/generalParsers";
import { newUserParser } from "../utils/parsers/userParser";
import { wrapInPromise } from "../utils/promiseWrapper";

export const getAllUsers = async () => {
  const { data: allUserData, error: allUserError } = await wrapInPromise<
    TUser[]
  >(User.find({}));

  if (allUserError) {
    throw new Error("Error while fetching all users: " + allUserData);
  }

  return allUserData;
};

export const postNewUser = async (obj: Partial<TNewUser>) => {
  const { data: allUsersData, error: allUsersError } =
    await wrapInPromise<TUser[]>(getAllUsers());

  if (allUsersError) {
    throw new Error("Error while fetching all users: " + allUsersError);
  }

  const { data: userData, error: userError } = await wrapInPromise<TNewUser>(
    newUserParser(obj, allUsersData!),
  );

  if (userError || !userData) {
    throw new Error(userError);
  }

  const { data: passwordHashed, error: passwordHashedError } =
    await wrapInPromise<string>(bcrypt.hash(stringParser(obj.password), 10));

  if (passwordHashedError || !passwordHashed) {
    throw new Error("Error while hashing password: " + passwordHashedError);
  }

  const user = new User({
    ...userData,
    password: passwordHashed,
  });
  const savedUser = await user.save();

  return savedUser;
};
