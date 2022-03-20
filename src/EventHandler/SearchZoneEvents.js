import * as domUtil from "/util/domutil.js";

class SearchZoneController {
  constructor({ inputDom, menuDom, inputView, menuView, inputSearch }) {
    this.inputDom = domUtil.$(inputDom);
    this.menuDom = domUtil.$(menuDom);
    this.inputView = inputView; // view컨트롤러를 외부에서 변수 저장하고 사용할까 프로퍼티로 사용할까?
    this.menuView = menuView; // new ViewController()
    this.inputSearch = domUtil.$(inputSearch);
    this.searched = [];
  }

  initService() {
    this.inputDom.addEventListener("input", (event) => {
      this.onInputSearchInput(event);
    });

    this.inputSearch.addEventListener("focus", (event) => {
      this.onFocusSearchinput(event);
    });

    this.inputDom.addEventListener("keydown", (event) => this.onKeyDown(event));

    this.menuDom.addEventListener("click", (event) =>
      this.onClickSearchMenu(event)
    );
    document.body.addEventListener("click", (event) =>
      this.onClickOutSearchMenu(event)
    );
  }

  onInputSearchInput({ target: { value } }) {
    this.inputView.renderAutoComplete(value);
  }

  onFocusSearchinput() {
    this.inputView.renderHistory();
  }

  onClickSearchMenu() {
    this.menuView.renderToggle();
  }

  onKeyDown(event) {
    const { keyCode } = event;

    const ENTER = 13;
    const KEY_UP = 38;
    const KEY_DOWN = 40;
    if (keyCode === ENTER) {
      this.inputView.saveSearchingData(event);
      return;
    }

    if (keyCode === KEY_UP || keyCode === KEY_DOWN) {
      this.inputView.hilightSearchList(keyCode);
    }
  }

  onClickOutSearchMenu({ target: { className } }) {
    this.menuView.clickedOutMenu(className);
  }

  onClickRemoveBtn() {
    this.inputView.removeHistory();
  }
}

export { SearchZoneController };
