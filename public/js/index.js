import ImgSlider from "./component/ImgSlider.js";
import { sliderData } from "../data/data.js";

const slideUlElement = document.querySelector(".carousel-items");
const imgAreaNode = document.querySelector(".carousel-img-area");

const imgSlider = new ImgSlider({
  data: sliderData,
  sec: 1.7,
  slideUlElement,
  imgAreaNode,
});

imgSlider.init();
