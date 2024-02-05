import { isDate, isNumber } from "../typeGuards/generalGuards";
import logger from "../logger";
import { isJwtPayload, isString } from "../typeGuards/generalGuards";

export const jwtPayloadParser = async (param: unknown) => {
  if (isJwtPayload(param)) {
    return param;
  }
  console.log(isJwtPayload(param));
  logger.info(param);
  throw new Error("while parsing provided token: " + param);
};

export const stringParser = async (param: unknown) => {
  if (!param || !isString(param)) {
    logger.error(param);
    throw new Error(`${param} is not a string.`);
  }
  return param;
};

export const dateParser = async (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date" + date);
  }
  return date;
};

export const numberParser = async (num: unknown) => {
  if (!num || !isNumber(num)) {
    throw new Error(`${num} is not a number`);
  }

  return num;
};
