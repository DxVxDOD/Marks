import { TNewMark } from "../types/mark";
import { markParser } from "../utils/parsers/markParser";
import { wrapInPromise } from "../utils/promiseWrapper";

export const postNewMark = async (obj: Partial<TNewMark>) => {
  const { data: markData, error: markError } = await wrapInPromise(
    markParser(obj),
  );

  if (markError || !markData) {
    throw new Error(markError);
  }
};
