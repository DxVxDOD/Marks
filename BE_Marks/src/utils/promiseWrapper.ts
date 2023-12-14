export const wrapInPromise = async <T>(func: T) => {
  const [result] = await Promise.allSettled([func]);
  if (result.status === "fulfilled")
    return { data: result.value as ReturnType<T>, error: undefined };
  return { data: undefined, error: result.reason };
};
