const express = require("express");
const app = express();
const fakeDB_router = require("./server/routes/data");
const path = require("path");

app.use(express.static(__dirname));

app.use("/fakeDB", fakeDB_router);

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/index.html");
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/items", (req, res) => {
  const q = req.query.input;

  const items = require(path.join(__dirname, "/server/data/fakeDB.json"));
  const result = items.items.filter((v) => v.name.includes(q)).sort((a, b) => b.views - a.views);
  res.json(result);
});

app.listen(3000, () => {
  console.log("listen t0 3000");
});
