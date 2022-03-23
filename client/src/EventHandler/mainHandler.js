class mainController {
  constructor({ searchInputHandler, searchMenuHandler }) {
    this.searchInputHandler = searchInputHandler;
    this.searchMenuHandler = searchMenuHandler;
  }

  initService() {
    this.searchInputHandler.init();
    this.searchMenuHandler.init();
  }
}

export { mainController };
