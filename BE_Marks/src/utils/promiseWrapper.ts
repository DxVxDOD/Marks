export const wrapInPromise = async <T>(promise: unknown) => {
	const [result] = await Promise.allSettled([promise]);
	if (result.status === "fulfilled")
		return { data: result.value as T, error: undefined };
	return { data: undefined, error: result.reason };
};
