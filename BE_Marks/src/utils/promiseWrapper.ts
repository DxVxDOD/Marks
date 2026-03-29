import logger from "./logger";

export const wrapInPromise = async <T>(func: T) => {
	const [result] = await Promise.allSettled([func]);

	if (result.status === "fulfilled") return { data: result.value, error: null };

	logger.error(result.reason);
	return { data: null, error: new Error(result.reason) };
};
