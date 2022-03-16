import express from "express";
import db from "../fakeDB/db";

const searchRouter = express.Router();

searchRouter.get("/autoComplete", (req, res) => {
  const { keyword } = req.query;
  const results = Array.from(db[keyword] || []);
  res.json({ results });
});

export default searchRouter;
