import express from "express";
import path from "path";
import dataRouter from "./router/dataRouter.js";
import mainRouter from "./router/mainRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(express.json()); // get json request
app.use(express.static(path.join(__dirname, "client")));
app.use("/assets", express.static("assets"));
app.use("/images", express.static(path.join("src", "images")));
app.use("/", mainRouter);
app.use("/data", dataRouter);

export default app;
