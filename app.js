const express = require("express");
const app = express();
const fs = require("fs");

app.use("/src", express.static(__dirname + "/client/src"));

const autoCompleteData = JSON.parse(fs.readFileSync(__dirname + "/autoCompleteData.json", "utf-8"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.get("/autoComplete", function (req, res) {
  res.send(JSON.stringify(autoCompleteData[req.query.keyword]) || {});
});

app.listen(3000);
