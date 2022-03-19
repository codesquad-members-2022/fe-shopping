import express from "express";
import { searchWithKeyword, searchRecent } from "../controller/dataController";

const dataRouter = express.Router();

dataRouter.post("/keyword", searchWithKeyword);
dataRouter.post("/recent", searchRecent);

export default dataRouter;
