import { isDate } from "util/types";
import logger from "../logger";
import { isJwtToken, isString } from "../typeGuards";

export const jwtPayloadParser = (param: unknown) => {
  if (!param || !isString(param) || !isJwtToken(param)) {
    logger.error(param);
    throw new Error("Invalid arguments: " + param);
  }
  return param;
};

export const stringParser = (param: unknown) => {
  console.log(param);

  if (!param || !isString(param)) {
    logger.error(param);
    throw new Error(`${param} is not a string.`);
  }
  return param;
};

export const dateParser = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date" + date);
  }
  return date;
};
