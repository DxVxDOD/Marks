import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { TCredentials } from "../types/credentials";
import config from "../utils/config";
import { stringParser } from "../utils/parsers/generalParsers";
import { wrapInPromise } from "../utils/promiseWrapper";
import { isCredentials } from "../utils/typeGuards/generalGuards";
import { TUserToFE } from "../types/user";

export const login = async (obj: Partial<TCredentials>) => {
  if (!isCredentials(obj)) {
    throw new Error("Wrong fields provided for credentials");
  }

  const { username, password }: TCredentials = {
    username: stringParser(obj.username),
    password: stringParser(obj.password),
  };

  const { data: userData, error: userError } = await wrapInPromise(
    User.findOne({ username }),
  );

  if (userError || !userData) {
    throw new Error(
      "Error while fetching user by username: " + userError.message,
    );
  }

  const correctPassword = await wrapInPromise(
    bcrypt.compare(password, userData.password),
  );

  if (!correctPassword.data || correctPassword.error) {
    throw new Error(
      "Error wrong password provided: " + correctPassword.error.message,
    );
  }

  const userForToken = {
    username: userData.username,
    id: userData.id,
  };

  const SECRET = stringParser(config.SECRET);

  const token = jwt.sign(userForToken, SECRET);

  const user: TUserToFE = {
    username: userData.username,
    createdAt: userData.createdAt,
    name: userData.name,
    email: userData.email,
    token,
    marks_length: userData.marks.length,
  };

  return user;
};
