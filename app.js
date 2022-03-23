const dataOfTshirt = require("./data/tshirt.js");
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use("/static", express.static(path.join(__dirname, "/public")));

app.get("/search", (req, res) => {
    if (req.query.category === "woman-fashion") {
        res.json(dataOfTshirt[req.query.category][req.query.keyword]);
    } else {
        res.json(dataOfTshirt.all[req.query.keyword]);
    }
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
