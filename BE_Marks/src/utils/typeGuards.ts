import { JwtPayload } from "jsonwebtoken";

export const isString = (param: unknown) => {
	return typeof param === "string" || param instanceof String;
};

export const isJwtToken = (param: unknown): param is JwtPayload => {
	return (param as JwtPayload).aud !== undefined;
};
