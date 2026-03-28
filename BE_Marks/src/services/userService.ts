import bcrypt from "bcrypt";
import User from "../models/userModel";
import { TNewUser, TUser } from "../types/user";
import { stringParser } from "../utils/parsers/generalParsers";
import { newUserParser } from "../utils/parsers/userParser";
import { wrapInPromise } from "../utils/promiseWrapper";

export const getAllUsers = async (): Promise<TUser[]> => {
  const { data, error } = await wrapInPromise(User.find({}));
  if (error) throw error;
  if (!data) {
    throw new Error("Could not get all users");
  }
  return data;
};

export const getUserById = async (id?: string) => {
  const { data, error } = await wrapInPromise(User.findById(stringParser(id)));
  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error("No user returned");
  }
  return data;
};

export const postNewUser = async (obj: Partial<TNewUser>) => {
  const { data: allUsersData, error: allUsersError } =
    await wrapInPromise(getAllUsers());
  if (allUsersError) throw allUsersError;

  const { data: userData, error: userError } = await wrapInPromise(
    newUserParser(obj, allUsersData),
  );
  if (userError) {
    throw new Error("Error while parsing new user data: " + userError.message);
  }

  const { data: passwordHashed, error: passwordHashedError } =
    await wrapInPromise(bcrypt.hash(stringParser(obj.password), 10));
  if (passwordHashedError) {
    throw new Error(
      "Error while hashing password: " + passwordHashedError.message,
    );
  }

  const user = new User({
    ...userData,
    password: passwordHashed,
  });

  const { data: savedUser, error: savedUserError } = await wrapInPromise(
    user.save(),
  );
  if (savedUserError) {
    throw new Error(
      "Error while saving user to database: " + savedUserError.message,
    );
  }

  return savedUser;
};
