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

app.get('/category/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/category.json'));
});

app.get('/search/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/search.json'));
});

app.get('/search/eeung/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/search-eeung.json'));
});

app.get('/search/ah/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/search-ah.json'));
});

app.get('/menu/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/SmartMenu.json'));
});

const port = 3000;
app.listen(port, function () {
  console.log('server on!');
});
