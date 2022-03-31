import Dropdown from './search/dropdown.js';
import Carousel from './carousel/carousel.js';
import CategoryPresenter from './category/category-presenter.js';
import { inputInit } from './search/input/app-input.js';

(() => {
  const dropdown = new Dropdown();
  const carousel = new Carousel();
  const presenter = new CategoryPresenter();
  dropdown.addBtnEvent();
  carousel.startSlide();
  presenter.categoryInit();
  inputInit();
})();
