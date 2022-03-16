const express = require('express');
const app = express();
const fakeDB_router = require('./router/data');
const path = require("path");

app.use(express.static(__dirname + '/public'));

app.use('/fakeDB', fakeDB_router);

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/index.html");
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('listen t0 3000')
})