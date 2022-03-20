import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("./"));

app.set("port", PORT);

app.get("/", (req, res) => {
  res.sendFile(path.resolve() + "/index.html");
});

app.get("/searchData", (req, res) => {
  res.sendFile(path.resolve() + "/searchData.json");
});

app.get("/carouselData", (req, res) => {
  res.sendFile(path.resolve() + "/carouselData.json");
});

app.listen(PORT, () => {
  console.log("서버 시작 : " + app.get("port"));
});
