const express = require("express");
const db = require("../fakeDB/db");
const searchCategory = require("../fakeDB/searchCategory");

const searchRouter = express.Router();

searchRouter.get("/category", (req, res) => {
  const results = searchCategory;
  res.json({ results });
});
searchRouter.get("/autoComplete", (req, res) => {
  const { keyword } = req.query;
  const results = Array.from(db[keyword] || []);
  res.json({ results });
});

module.exports = searchRouter;
