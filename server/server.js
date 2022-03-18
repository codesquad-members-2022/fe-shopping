import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import searchRouter from "./routers/searchRouter.js";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();

app.use(express.static(__dirname + "/client/src"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
});

app.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "/client/index.html"), (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).end(`<h1>ERROR</h1>`);
    }
    res.status(200).end(data);
  });
});

app.use("/search", searchRouter);
