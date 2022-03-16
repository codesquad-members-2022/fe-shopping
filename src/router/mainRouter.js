import express from "express";
import { mainController } from "../controller/mainController";

const mainRouter = express.Router();

mainRouter.get("/", mainController);

export default mainRouter;
