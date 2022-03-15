import express from "express";

const app = express();
const handleHome = (req, res) => {
  return res.render("index");
};

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(express.static(process.cwd() + "/src/client"));
app.use("/assets", express.static("assets"));

app.get("/", handleHome);

export default app;
