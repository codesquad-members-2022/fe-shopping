const express = require("express");
const app = express();
const PORT_NUM = 3000;

app.use("/", express.static("src"));

app.listen(PORT_NUM);
