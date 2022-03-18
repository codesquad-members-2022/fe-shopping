const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/autoComplete', (req, res) => {
  const autoComplete = require('./db/autoComplete/autoComplete.json');
  const { q } = req.query;
  res.json(autoComplete[q]);
});

app.listen(3000);
