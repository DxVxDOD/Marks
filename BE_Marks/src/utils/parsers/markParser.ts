import { TMarkFE, TNewMark } from "../../types/mark";
import { isMarkFromFE, isNewMark } from "../typeGuards/markGuards";
import { numberParser, stringParser } from "./generalParsers";

export const newMarkParser = (obj: Partial<TNewMark>) => {
	if (isNewMark(obj)) {
		const newMark: TNewMark = {
			tag: stringParser(obj.tag),
			url: stringParser(obj.url),
			title: stringParser(obj.title),
		};

		return newMark;
	}

	throw new Error("Failed parsing new Mark");
};

export const markParser = (obj: Partial<TMarkFE>) => {
	if (isMarkFromFE(obj)) {
		const mark: TMarkFE = {
			title: stringParser(obj.title),
			tag: stringParser(obj.tag),
			url: stringParser(obj.url),
			likes: numberParser(obj.likes),
		};

		return mark;
	}

	throw new Error("Failed parsing Mark");
};
