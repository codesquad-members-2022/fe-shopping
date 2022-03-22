const express = require('express');
const app = express();
const carouselData = require('./public/data/carousel/carousel.json');
const completeData = require('./public/data/auto-complete/auto-complete.json');

const port = 5050;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname));

app.get('/carouselData', (req, res) => {
  res.json(carouselData);
});

app.get('/completeData', (req, res) => {
  res.json(completeData);
});

app.listen(port, () => {
  console.log(`start! express server on port ${port}`);
});
