const express = require("express");
const dataDisposer = require("../service/dataController/DisposeData.js");
const router = express.Router();

router.get("/:keyWord", (req, res) => {
  const keyWord = req.params.keyWord;
  res.json(dataDisposer.findMatchData(keyWord));
});

module.exports = router;
