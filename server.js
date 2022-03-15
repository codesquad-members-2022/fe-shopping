const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/header/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/header.json'));
});

app.get('/carousel/data', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/json/carousel.json'));
});

const port = 3000;
app.listen(port, function () {
  console.log('server on!');
});
