const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/goodsData', function(req, res) {
  const goodsData = fs.readFileSync(path.join(__dirname, '/data/goodsData.json'), 'utf-8');
  res.send(goodsData);
});

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Example app listening on port ${port}`);
});
