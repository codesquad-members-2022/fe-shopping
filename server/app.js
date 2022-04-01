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
  fs.readFile(path.join(__dirname, '/data/goodsData.json'), (error, data) => {
    if (error) {
      throw error;
    }
    res.send(data);
  });
});

app.get('/categoryListData', function(req, res) {
  fs.readFile(path.join(__dirname, '/data/categoryListData.json'), (error, data) => {
    if (error) {
      throw error;
    }
    res.send(data);
  });
});

app.get('/categoryImageData', function(req, res) {
  fs.readFile(path.join(__dirname, '/data/categoryImageData.json'), (error, data) => {
    if (error) {
      throw error;
    }
    res.send(data);
  });
});

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Example app listening on port ${port}`);
});
