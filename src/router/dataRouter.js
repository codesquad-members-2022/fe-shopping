import express from "express";
import {
  searchWithKeyword,
  manageRecentData,
  sendCategories,
} from "../controller/dataController";

const dataRouter = express.Router();

dataRouter.route("/keyword").post(searchWithKeyword);
dataRouter.route("/categories").post(sendCategories);
dataRouter.route("/recent").post(manageRecentData);
dataRouter.route("/recent/delete").delete(manageRecentData);

export default dataRouter;
