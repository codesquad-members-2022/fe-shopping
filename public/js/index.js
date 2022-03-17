import ImgSlider from "./component/ImgSlider.js";
import { $ } from "./util/util.js";
import { sliderData } from "../data/data.js";

const imgSlider = new ImgSlider({
  data: sliderData,
  sec: 1.7,
  slideUlElement: $(".carousel-items"),
  imgAreaNode: $(".carousel-img-area"),
});

imgSlider.init();
