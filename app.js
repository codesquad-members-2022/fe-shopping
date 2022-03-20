const dataOfTshirt = require("./data/tshirt.js");
const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

app.use("/static", express.static(path.join(__dirname, "/public")));

app.get("/search", (req, res) => {
    res.json(dataOfTshirt[req.query.keyword]);
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
