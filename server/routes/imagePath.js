const express = require("express");
const imageFinder = require("../service/dataController/DisposeData.js");
const router = express.Router();

router.get("/:bannerTagId", (req, res) => {
  const imageId = req.params.bannerTagId;
  res.json(imageFinder.getImageUrl(imageId));
});

module.exports = router;
