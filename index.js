const express = require("express");
const app = express();
const PORT_NUM = 3000;

const searchData = require("./routes/searchPath.js");

app.use("/", express.static("src"));
app.use("/search", searchData);
app.listen(PORT_NUM);
