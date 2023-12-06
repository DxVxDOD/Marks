import express from "express";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get("/ping", (_req, res) => {
	console.log("someone pinged here !");
	res.send("Pong!");
});

if (process.env.NODE_ENV === "test") {
	app.use("/api/testing");
}
