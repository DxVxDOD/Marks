import { TMarkFE, TNewMark } from "../../types/mark";
import { isMarkFromFE, isNewMark } from "../typeGuards/markGuards";
import { stringParser } from "./generalParsers";

export const newMarkParser = (obj: Partial<TNewMark>): TNewMark => {
  if (isNewMark(obj)) {
    return {
      tag: stringParser(obj.tag),
      url: stringParser(obj.url),
      title: stringParser(obj.title),
    };
  }
  throw new Error("Failed parsing new Mark");
};

export const markParser = (obj: Partial<TMarkFE>): TMarkFE => {
  if (isMarkFromFE(obj)) {
    return {
      title: stringParser(obj.title),
      tag: stringParser(obj.tag),
      url: stringParser(obj.url),
    };
  }
  throw new Error("Failed parsing Mark");
};
