import { TMarkFE, TNewMark } from "../../types/mark";
import { wrapInPromise } from "../promiseWrapper";
import { isMarkFromFE, isNewMark } from "../typeGuards/markGuards";
import { numberParser, stringParser } from "./generalParsers";

export const newMarkParser = async (obj: Partial<TNewMark>) => {
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

export const markParser = async (obj: Partial<TMarkFE>) => {
  const checkMark = await wrapInPromise(isMarkFromFE(obj));
  if (checkMark.error || !checkMark.data) {
    throw new Error(checkMark.error);
  }

  const mark: TMarkFE = {
    title: stringParser(obj.title),
    tag: stringParser(obj.tag),
    url: stringParser(obj.url),
    likes: numberParser(obj.likes),
  };

  return mark;
};
