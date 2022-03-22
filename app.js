const express = require('express');
const app = express();
const autocompleteData = require('./public/data/autocompleteData.json');
const port = 8000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/autocomplete', (req, res) => {
  res.send(JSON.stringify(autocompleteData[req.query.value]));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
