import { TMarkFE, TNewMark } from "../../types/mark";
import { isMarkFromFE, isNewMark } from "../typeGuards/markGuards";
import { stringParser } from "./generalParsers";

export const newMarkParser = (obj: Partial<TNewMark>) => {
  if (isNewMark(obj)) {
    const tag = stringParser(obj.tag);
    if (tag instanceof Error) return tag;

    const url = stringParser(obj.url);
    if (url instanceof Error) return url;

    const title = stringParser(obj.title);
    if (title instanceof Error) return title;

    const newMark: TNewMark = {
      tag,
      url,
      title,
    };

    return newMark;
  }
  return new Error("Failed parsing new Mark");
};

export const markParser = (obj: Partial<TMarkFE>) => {
  if (isMarkFromFE(obj)) {
    const mark: TMarkFE = {
      title: stringParser(obj.title),
      tag: stringParser(obj.tag),
      url: stringParser(obj.url),
    };

    return mark;
  }

  throw new Error("Failed parsing Mark");
};
