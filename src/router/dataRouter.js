import express from "express";
import {
  searchWithKeyword,
  searchRecent,
  sendCategories,
  deleteRecent,
} from "../controller/dataController";

const dataRouter = express.Router();

dataRouter.route("/keyword").post(searchWithKeyword);
dataRouter.route("/categories").post(sendCategories);
dataRouter.route("/recent").post(searchRecent);
dataRouter.route("/recent/delete").delete(deleteRecent);

export default dataRouter;
