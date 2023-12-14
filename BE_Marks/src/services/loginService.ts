import config from "../utils/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import { TCredentials } from "../types/credentials";
import { TUser } from "../types/user";
import { stringParser } from "../utils/parsers/generalParsers";
import { wrapInPromise } from "../utils/promiseWrapper";
import { isCredentials } from "../utils/typeGuards";

export const login = async (obj: Partial<TCredentials>) => {
  const checkCredentials = await wrapInPromise(isCredentials(obj));
  if (checkCredentials.error) {
    throw new Error(checkCredentials.error);
  }

  const { username, password }: TCredentials = {
    username: stringParser(obj.username),
    password: stringParser(obj.password),
  };

  const { data: userData, error: userError } = await wrapInPromise<TUser>(
    User.findOne({ username }),
  );

  if (userError || !userData) {
    throw new Error("Error while fetching user: " + userError);
  }

  const correctPassword = await wrapInPromise(
    bcrypt.compare(password, userData.password),
  );

  if (correctPassword.data === false) {
    throw new Error("Error wrong password provided");
  }

  const userForToken = {
    username: userData.username,
    id: userData.id,
  };

  const SECRET = stringParser(config.SECRET);

  const token = jwt.sign(userForToken, SECRET);

  return {
    username: userData.username,
    token: token,
    name: userData.name,
  };
};
