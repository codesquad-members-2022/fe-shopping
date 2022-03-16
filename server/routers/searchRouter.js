import express from "express";
import { getSearch, postSearch } from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/:keyword", getSearch);

export default searchRouter;
