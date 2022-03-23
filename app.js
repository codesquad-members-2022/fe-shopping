const express = require("express");
const app = express();
const fs = require("fs");

app.use("/src", express.static(__dirname + "/client/src"));

const autoCompleteData = JSON.parse(fs.readFileSync(__dirname + "/autoCompleteData.json", "utf-8"));
const categoryData = JSON.parse(fs.readFileSync(__dirname + "/categoryData.json", "utf-8"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.get("/autoComplete", function (req, res) {
  res.send(JSON.stringify(autoCompleteData[req.query.keyword]) || []);
});
app.get("/category", function (req, res) {
  res.send(JSON.stringify(categoryData[req.query.type]) || []);
});

app.listen(process.env.PORT || 3000);
