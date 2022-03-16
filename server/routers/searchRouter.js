import express from "express";
import { getSearch, postSearch } from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/", getSearch);
searchRouter.post("/", postSearch);

export default searchRouter;
