import { TComment, TNewComment } from "../../types/comment";

export const isNewComment = (obj: Partial<TNewComment>) => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Error object does not exist: " + obj);
  }

  const schema: Record<keyof TNewComment, string> = {
    content: "string",
    markId: "string",
  };

  const missingProperties = Object.keys(schema)
    .filter((key) => obj[key as keyof Partial<TNewComment>] === undefined)
    .map((key) => {
      throw new Error(
        `Object is missing: ${key} ${schema[key as keyof TNewComment]}`,
      );
    });

  return missingProperties.length === 0;
};

export const isComment = (obj: Partial<TComment>) => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Error object does not exist: " + obj);
  }

  const schema: Record<keyof TComment, string> = {
    content: "string",
    markId: "string",
    userId: "string",
    numberOfLikes: "string",
    like: "boolean",
    id: "string",
  };

  const missingProperties = Object.keys(schema)
    .filter((key) => obj[key as keyof Partial<TComment>] === undefined)
    .map((key) => {
      throw new Error(
        `Object is missing: ${key} ${schema[key as keyof TComment]}`,
      );
    });

  return missingProperties.length === 0;
};
