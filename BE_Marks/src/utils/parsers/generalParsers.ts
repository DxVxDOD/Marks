import { isDate } from "../typeGuards/generalGuards";
import logger from "../logger";
import { isJwtPayload, isString } from "../typeGuards/generalGuards";

export const jwtPayloadParser = (param: unknown) => {
  if (isString(param) && isJwtPayload(param)) {
    logger.error(param);
    return param;
  }
  throw new Error("Error while parsing provided token: " + param);
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
