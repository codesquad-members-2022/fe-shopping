const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
})

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('[START] express server on!');
});