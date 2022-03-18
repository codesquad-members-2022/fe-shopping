import express from "express";
import { getSearch } from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/:keyword", getSearch);

export default searchRouter;
