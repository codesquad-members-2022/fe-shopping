import ImgSlider from "../core/ImgSlider.js";

export default function MainBanner({
  data,
  sec,
  slideUlElement,
  imgAreaElement,
}) {
  ImgSlider.call(this, ...arguments);
}

MainBanner.prototype = Object.create(ImgSlider.prototype);

MainBanner.prototype.createSliderItems = function () {
  const sliderItemsTag = this.data.reduce((prev, cur, idx) => {
    return (
      prev +
      `
        <li class="carousel-item" data-carousel-idx="${idx}">
        <img src="${cur["thumbnail"]}" alt="${cur["alt"]}" class="img">
        </li>`
    );
  }, "");
  return sliderItemsTag;
};

MainBanner.prototype.setCurSlideImg = function () {
  this.imgAreaElement.style.backgroundImage = `url(${
    this.data[this.curIdx]["backgroundImg"]
  })`;
};
