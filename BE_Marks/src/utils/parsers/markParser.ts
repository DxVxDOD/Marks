import { TNewMark } from "../../types/mark";
import { wrapInPromise } from "../promiseWrapper";
import { isMark } from "../typeGuards";
import { stringParser } from "./generalParsers";

export const markParser = async (obj: Partial<TNewMark>) => {
  const checkMark = await wrapInPromise(isMark(obj));

  if (checkMark.error) {
    throw new Error(checkMark.error);
  }

  return {
    tag: stringParser(obj.tag),
    url: stringParser(obj.url),
    title: stringParser(obj.title),
  };
};
