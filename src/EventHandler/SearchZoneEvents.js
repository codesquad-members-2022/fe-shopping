import * as domUtil from "/util/domutil.js";
import {
  SearchInputToggleView,
  SearchMenuToggleView,
} from "/View/HeaderView.js";
import {
  SearchInputToggle,
  SearchMenuToggle,
} from "../Components/headerToggle.js";
import { fetch_use } from "/util/fetchutil.js";

class SearchZoneController {
  constructor(inputDom, menuDom, inputView, menuView, inputSearch) {
    this.inputDom = domUtil.$(inputDom);
    this.menuDom = domUtil.$(menuDom);
    this.inputView = inputView; // view컨트롤러를 외부에서 변수 저장하고 사용할까 프로퍼티로 사용할까?
    this.menuView = menuView; // new ViewController()
    this.inputSearch = domUtil.$(inputSearch);
    this.searched = [];
  }

  initService() {
    this.inputDom.addEventListener("input", (event) =>
      this.onInputSearchInput(event)
    );

    this.inputSearch.addEventListener("focus", (event) =>
      this.onFocusSearchinput(event)
    );

    this.inputDom.addEventListener("keydown", (event) =>
      this.onKeyDownEnter(event)
    );
    this.menuDom.addEventListener("click", (event) =>
      this.onClickSearchMenu(event)
    );
    document.body.addEventListener("click", (event) =>
      this.onClickOutSearchMenu(event)
    );
  }

  onInputSearchInput({ target: { value } }) {
    // fetch_use(
    //   `search/${value}`,
    //   (jsonData) => new SearchInputToggle(jsonData).dom
    // )
    //   .then(() => this.inputView.renderToggle())
    //   .then(() => this.inputView.renderHistory());
    this.inputView.renderAutoComplete(value);
  }

  onFocusSearchinput() {
    this.inputView.renderHistory();
  }

  onClickSearchMenu() {
    this.menuView.renderToggle();
  }

  onKeyDownEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();

      this.searched = new Set([
        ...this.searched,
        domUtil.$(".header__main--searchInput").value,
      ]);
    }
  }

  onClickOutSearchMenu({ target: { className } }) {
    this.menuView.clickedOutMenu(className);
  }
}

export { SearchZoneController };
