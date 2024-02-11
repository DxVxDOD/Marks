import { TNewComment } from "../../types/comment";

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
		.map((key) => key as keyof TNewComment)
		.map((key) => {
			throw new Error(`Object is missing: ${key} ${schema[key]}`);
		});

	return missingProperties.length === 0;
};
