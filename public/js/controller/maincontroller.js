import SmartMenuController from './smartmenucontroller.js';
import CarouselController from './carouselcontroller.js';

export default class MainController {
  constructor() {
    this.smartmenuController = new SmartMenuController();
    this.carouselController = new CarouselController();
  }

  init() {
    this.smartmenuController.init();
    this.carouselController.init();
  }
}
