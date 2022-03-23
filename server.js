import express from 'express';
import cors from 'cors';
import path from 'path';

const PORT = process.env.PORT || 5000;

const app = express();
const __dirname = path.resolve();

app.locals.pretty = true;
app.use(express.static('./'));
app.use(cors());

app.get('/', (req, res) => {
  res.render(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
