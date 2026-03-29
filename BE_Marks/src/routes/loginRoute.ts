import express, { type Request, type Response } from "express";
import { login } from "../services/loginService";

const loginRouter = express.Router();

loginRouter.post("/", async (req: Request, res: Response) => {
	try {
		const data = await login(req.body);
		res.status(200).json(data);
	} catch (err) {
		console.log("Something happened", err);
		res.status(401).json({ error: "No no no" });
	}
});

export default loginRouter;
