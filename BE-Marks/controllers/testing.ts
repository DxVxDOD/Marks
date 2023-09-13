import express from "express";
import Mark from "../models/marks.js";
import User from "../models/user.js";

const testingRouter = express.Router();

testingRouter.post("/reset", async (request, response) => {
  await Mark.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

export default testingRouter;
