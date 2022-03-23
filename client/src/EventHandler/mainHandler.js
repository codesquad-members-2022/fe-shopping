class mainController {
  constructor({ searchInputHandler, searchMenuHandler }) {
    this.searchInputHandler = searchInputHandler;
    this.searchMenuHandler = searchMenuHandler;
  }

  initService() {
    this.searchInputHandler.init();
    this.searchMenuHandler.init();
  }

  // onKeyDown(event) {
  //   const { keyCode } = event;

  //   const ENTER = 13;
  //   const KEY_UP = 38;
  //   const KEY_DOWN = 40;
  //   if (keyCode === ENTER) {
  //     this.inputView.saveSearchingData(event);
  //     return;
  //   }

  //   if (keyCode === KEY_UP || keyCode === KEY_DOWN) {
  //     this.inputView.hilightSearchList(keyCode);
  //   }
  // }

  // onClickOutSearchMenu({ target: { className } }) {
  //   this.menuView.clickedOutMenu(className);
  // }

  // onClickRemoveBtn() {
  //   this.inputView.removeHistory();
  // }
}

export { mainController };
