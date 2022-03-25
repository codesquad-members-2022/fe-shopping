import Dropdown from './search/dropdown.js';
import InputEvent from './search/input-form/input-event.js';
import Carousel from './carousel/carousel.js';
import CategoryPresenter from './category/category-presenter.js';

(() => {
  const dropdown = new Dropdown();
  const inputEvent = new InputEvent();
  const carousel = new Carousel();
  const presenter = new CategoryPresenter();
  dropdown.addBtnEvent();
  inputEvent.addInputEvent();
  carousel.startSlide();
  presenter.categoryInit();
})();
