import express = require("express");
import Filter from "../models/filter.js";
import { TFilter } from "../types/filter.js";

const filterRouter = express.Router();

filterRouter.get("/", async (request, response) => {
  const filters = await Filter.find({});
  response.json(filters);
});

filterRouter.post("/", async (request, response) => {
  if (!request.body) {
    return response.status(400).json({ error: "Content is missing" });
  }

  const { filterName, markId }: TFilter = request.body;

  const filter = new Filter({
    filterName,
    markId,
  });

  const savedFilter = await filter.save();

  response.status(201).json(savedFilter);
});

export default filterRouter
