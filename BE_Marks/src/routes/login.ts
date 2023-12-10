import express, { type Request, type Response } from "express";

const loginRouter = express.Router();

loginRouter.get("/", (_req: Request, res: Response) => {
	res.send("login route");
});

loginRouter.post("/", async (req: Request, res: Response) => {
	const {} = req.body;
});
