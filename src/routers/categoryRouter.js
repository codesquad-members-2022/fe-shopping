const express = require("express");
const category = require("../fakeDB/category");

const categoryRouter = express.Router();

categoryRouter.get("/", (req, res) => {
  const results = category;
  res.json({ results });
});

module.exports = categoryRouter;
