import carouselModel from "../model/carouselModel.js";

const renderCarousel = () => {
  carouselModel.render();
  carouselModel.init();
  carouselModel.setEvent(document.querySelector(".item__img"), document.querySelector(".carousel__snb"));
};

export { renderCarousel };
