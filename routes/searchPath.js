const express = require("express");
const dataDisposer = require("../service/dataController/DisposeData.js");
const router = express.Router();

router.get("/menu/toggle", (req, res) => {
  res.json(dataDisposer.findSearchMenu());
});

router.get("/:keyWord", (req, res) => {
  const keyWord = decodeURIComponent(req.params.keyWord);
  res.json(dataDisposer.findMatchData(keyWord));
});

module.exports = router;
