import logger from "./logger";

export const wrapInPromise = async <T>(func: T) => {
	const [result] = await Promise.allSettled([func]);
	if (result.status === "rejected") {
		logger.error(result.reason);
		return { data: undefined, error: new Error(result.reason) };
	}
	return { data: result.value, error: undefined };
};
