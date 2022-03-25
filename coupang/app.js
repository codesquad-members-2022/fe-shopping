const express = require("express");
const router = require("./routes/dataRouter.js");
const app = express();
const cors = require("cors");
const PORT = 3000;
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.use(express.static("public"));
app.use("/", router);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "views/main.html");
});

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("The server is listening on port 3000");
});
