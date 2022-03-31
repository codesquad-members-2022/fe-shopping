import SmartMenuController from './smartmenucontroller.js';
import CarouselController from './carouselcontroller.js';
import SearchController from './searchcontroller.js';

export default class MainController {
  constructor() {
    this.smartmenuController = new SmartMenuController();
    this.carouselController = new CarouselController();
    this.searchController = new SearchController();
  }

  init() {
    this.smartmenuController.init();
    this.carouselController.init();
    this.searchController.init();
  }
}
