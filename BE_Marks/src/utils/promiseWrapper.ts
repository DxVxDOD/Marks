import logger from "./logger";

export const wrapInPromise = async <T>(func: T) => {
  const [result] = await Promise.allSettled([func]);
  if (result.status === "rejected") {
    logger.error(result.reason);
    return { data: undefined, error: result.reason };
  }
  if (result.value instanceof Error) {
    logger.error(result.value);
    return { data: undefined, error: result.value };
  }
  return { data: result.value, error: undefined };
};
