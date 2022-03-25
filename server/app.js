const express = require("express");
const app = express();
const keyword = require("./data/keyword.json");
const port = 3000;
const maxListNum = 10;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/autocomplete", (req, res) => {
  const inputKeyword = req.query.keyword;

  let suggestion = keyword.products
    .filter((v) => v.keyword.includes(inputKeyword))
    .sort((a, b) => b.views - a.views)
    .map((v) => v.keyword);

  if (suggestion.length > maxListNum) {
    suggestion = suggestion.splice(0, maxListNum);
  }

  res.send(suggestion);
});

app.listen(port);
