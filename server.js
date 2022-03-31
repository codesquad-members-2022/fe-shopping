const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/header/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/header.json'));
});

app.get('/carousel/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/carousel.json'));
});

app.get('/search/category/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/category.json'));
});

app.get('/search/input/eeung/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/search-eeung.json'));
});

app.get('/search/input/ah/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/search-ah.json'));
});

const port = 3000;
app.listen(port, function () {
  console.log('server on!');
});
