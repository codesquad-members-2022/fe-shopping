const express = require("express");
const db = require("../fakeDB/db");

const searchRouter = express.Router();

searchRouter.get("/autoComplete", (req, res) => {
  const { keyword } = req.query;
  const results = Array.from(db[keyword] || []);
  res.json({ results });
});

module.exports = searchRouter;
