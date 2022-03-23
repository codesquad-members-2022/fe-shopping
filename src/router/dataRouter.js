import express from "express";
import {
  searchWithKeyword,
  searchRecent,
  sendCategories,
} from "../controller/dataController";

const dataRouter = express.Router();

dataRouter.post("/keyword", searchWithKeyword);
dataRouter.post("/recent", searchRecent);
dataRouter.post("/categories", sendCategories);

export default dataRouter;
