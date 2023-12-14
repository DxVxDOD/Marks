import { TNewMark } from "../../types/mark";
import { wrapInPromise } from "../promiseWrapper";
import { isNewMark } from "../typeGuards/markGuards";
import { stringParser } from "./generalParsers";

export const markParser = async (obj: Partial<TNewMark>) => {
  const checkMark = await wrapInPromise(isNewMark(obj));

  if (checkMark.error || checkMark.data === false) {
    throw new Error(checkMark.error);
  }

  return {
    tag: stringParser(obj.tag),
    url: stringParser(obj.url),
    title: stringParser(obj.title),
  };
};
