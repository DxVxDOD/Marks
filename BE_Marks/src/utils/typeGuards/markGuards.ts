import { TNewMark } from "../../types/mark";

export const isNewMark = (obj: Partial<TNewMark>) => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Error object does not exist: " + obj);
  }

  const schema: Record<keyof TNewMark, string> = {
    tag: "string",
    url: "string",
    title: "string",
  };

  const missingProperties = Object.keys(schema)
    .filter((key) => obj[key as keyof Partial<TNewMark>] === undefined)
    .map((key) => key as keyof TNewMark)
    .map((key) => {
      throw new Error(`Object is missing: ${key} ${schema[key]}`);
    });

  return missingProperties.length === 0;
};
