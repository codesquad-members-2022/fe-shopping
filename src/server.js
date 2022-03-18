import express from "express";
import dataRouter from "./router/dataRouter.js";
import mainRouter from "./router/mainRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(express.json()); // get json request
app.use(express.static(process.cwd() + "/src/client"));
app.use("/assets", express.static("assets"));
app.use("/images", express.static("src/images"));
app.use("/", mainRouter);
app.use("/data", dataRouter);

export default app;
