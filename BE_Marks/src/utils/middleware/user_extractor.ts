import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import User from "../../models/userModel";
import config from "../config";
import { jwtPayloadParser, stringParser } from "../parsers/generalParsers";
import { wrapInPromise } from "../promiseWrapper";
import { tokenExtractor } from "./token_extractor";

export const userExtractor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const SECRET = await stringParser(config.SECRET);

	const { data: token, error: tokenError } = await wrapInPromise(
		tokenExtractor(req, res, next)
	);

	if (!token || tokenError) {
		return res.status(401).json({ error: "{token} " + tokenError });
	}

	const { data: decodedToken, error: decodedTokenError } =
		await wrapInPromise(jsonwebtoken.verify(token, SECRET));

	if (!decodedToken || decodedTokenError) {
		return res
			.status(401)
			.json({ error: "{decodedToken} " + decodedTokenError });
	}

	const { data: verifiedToken, error: verifiedTokenError } =
		await wrapInPromise(jwtPayloadParser(decodedToken));

	if (verifiedTokenError || !verifiedToken) {
		return res
			.status(401)
			.json({ error: "{verifiedToken} " + verifiedTokenError });
	}

	const { data: user, error: userError } = await wrapInPromise(
		User.findById(verifiedToken.id)
	);

	if (userError || !user) {
		return res.status(401).json({
			error: "{Cannot find user in database} " + userError,
		});
	}

	res.locals.user = user;
	next();
};
