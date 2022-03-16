const imageData = require("../../data/bannerImage.json");

function getImageUrl(id) {
  return imageData[id];
}

module.exports = { getImageUrl };
