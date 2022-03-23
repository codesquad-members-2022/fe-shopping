import carouselModel from "../model/carouselModel.js";
import { $ } from "../util/util.js";

const renderCarousel = () => {
  carouselModel.render();
  carouselModel.init();
  carouselModel.setEvent($(".item__img"), $(".carousel__snb"));
};

export { renderCarousel };
