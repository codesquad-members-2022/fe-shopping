const express = require('express');
const app = express();
const carouselData = require('./public/data/carousel/carousel.json');

const port = 5050;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/', (req, res) => {
  res.json(carouselData.json);
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`start! express server on port ${port}`);
});
