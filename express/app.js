const express = require('express');
const app = express();
const port = 5050;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`start! express server on port ${port}`);
});
