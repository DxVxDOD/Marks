import { JwtPayload } from "jsonwebtoken";
import { isJwtToken, isString } from "./typeGuards";

export const jwtPayloadParser = (param: unknown): JwtPayload | string => {
	if (!param || !isString(param) || !isJwtToken(param)) {
		throw new Error("Invalid arguments: " + param);
	}
	return param;
};
