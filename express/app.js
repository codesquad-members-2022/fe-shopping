const express = require('express');
const app = express();
const carouselData = require('./public/data/carousel/carousel.json');
const gaData = require('./public/data/auto-complete/ga.json');
const naData = require('./public/data/auto-complete/na.json');
const daData = require('./public/data/auto-complete/da.json');
const raData = require('./public/data/auto-complete/ra.json');
const maData = require('./public/data/auto-complete/ma.json');
const baData = require('./public/data/auto-complete/ba.json');

const port = 5050;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/', (req, res) => {
  res.json(carouselData.json);
});

app.get('/', (req, res) => {
  res.json(gaData.json);
});
app.get('/', (req, res) => {
  res.json(naData.json);
});
app.get('/', (req, res) => {
  res.json(daData.json);
});
app.get('/', (req, res) => {
  res.json(raData.json);
});
app.get('/', (req, res) => {
  res.json(maData.json);
});
app.get('/', (req, res) => {
  res.json(baData.json);
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`start! express server on port ${port}`);
});
