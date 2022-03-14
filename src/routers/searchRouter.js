import express from "express";
import db from "../fakeDB/db";

const searchRouter = express.Router();

searchRouter.get("/autoComplete", (req, res) => {
  const { keyword } = req.query;
  res.json({ results: Array.from(db[keyword]) });
});

export default searchRouter;
