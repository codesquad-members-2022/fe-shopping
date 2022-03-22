const dataRouter = require('./router/dataRouter.js');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use('/data', dataRouter);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
