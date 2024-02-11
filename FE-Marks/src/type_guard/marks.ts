import { TMark } from "../types/mark";

export function isMark(obj: Partial<TMark>) {
  if (!obj || typeof obj !== "object") {
    throw new Error("Object doesn't exist" + obj);
  }
  const schema: Record<keyof TMark, string> = {
    url: "string",
    userId: "string",
    id: "string",
    likes: "number",
    createdAt: "Date",
    title: "string",
    tag: "string",
    comments: "Array<string>",
  };

  const missingProperties = Object.keys(schema)
    .filter((key) => obj[key as keyof Partial<TMark>] === undefined)
    .map((key) => key as keyof TMark)
    .map((key) => {
      throw new Error(`Object is missing ${key} ${schema[key]}`);
    });

  return missingProperties.length === 0;
}
