import { TComment } from "../types/comment";

export function isComment(obj: Partial<TComment>) {
  if (!obj || typeof obj !== "object") {
    throw new Error("Object doesn't exist" + obj);
  }
  const schema: Record<keyof TComment, string> = {
    markId: "string",
    content: "string",
    id: "string",
    userId: "string",
    createdAt: "Date",
    numberOfLikes: "number",
    like: "boolean",
  };

  const missingProperties = Object.keys(schema)
    .filter((key) => obj[key as keyof Partial<TComment>] === undefined)
    .map((key) => key as keyof TComment)
    .map((key) => {
      throw new Error(`Object is missing ${key} ${schema[key]}`);
    });

  return missingProperties.length === 0;
}
