const express = require("express");
const app = express();
const PORT_NUM = 3000;

const searchData = require("./server/routes/searchPath.js");
const imageData = require("./server/routes/imagePath.js");

app.use("/", express.static("./client/src"));
app.use("/search", searchData);
app.use("/image", imageData);

app.listen(PORT_NUM);
