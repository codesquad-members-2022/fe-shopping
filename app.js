const express = require("express");
const app = express();
const fs = require("fs");

const autoCompleteData = JSON.parse(fs.readFileSync("./autoCompleteData.json", "utf-8"));

app.use("/src", express.static(__dirname + "/src"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/autoComplete", function (req, res) {
  res.send(JSON.stringify(autoCompleteData[req.query.keyword]) || {});
});

app.listen(3000);
