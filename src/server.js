import express from "express";
import mainRouter from "./router/mainRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(express.static(process.cwd() + "/src/client"));
app.use("/assets", express.static("assets"));
app.use("/images", express.static("src/images"));

app.use("/", mainRouter);

export default app;
