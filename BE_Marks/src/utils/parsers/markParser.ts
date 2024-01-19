import { TMarkFE, TNewMark } from "../../types/mark";
import { wrapInPromise } from "../promiseWrapper";
import { isMarkFromFE, isNewMark } from "../typeGuards/markGuards";
import { numberParser, stringParser } from "./generalParsers";

export const newMarkParser = async (obj: Partial<TNewMark>) => {
  const checkMark = await wrapInPromise(isNewMark(obj));

  if (checkMark.error || !checkMark.data) {
    throw Error(checkMark.error);
  }

  return {
    tag: await stringParser(obj.tag),
    url: await stringParser(obj.url),
    title: await stringParser(obj.title),
  };
};

export const markParser = async (obj: Partial<TMarkFE>) => {
  const checkMark = await wrapInPromise(isMarkFromFE(obj));
  if (checkMark.error || !checkMark.data) {
    throw Error(checkMark.error);
  }

  const mark: TMarkFE = {
    title: await stringParser(obj.title),
    tag: await stringParser(obj.tag),
    url: await stringParser(obj.url),
    likes: await numberParser(obj.likes),
  };

  return mark;
};
