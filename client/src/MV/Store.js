import { defaultSearchState } from "./common/Default.js";
import { SearchInputView } from "./View/header/SearchInputView.js";
import { SearchInputModel } from "./Model/SearchModel.js";
import { SearchMenuView } from "./View/header/SearchMenuView.js";
import { SearchMenuModel } from "./Model/menuModel.js";

class Store {
  constructor({
    searchModelDefaultData,
    searchViewDefaultData,
    menuModelDefaultData,
    menuViewDefaultData,
  }) {
    this.searchModel = new SearchInputModel(searchModelDefaultData);
    this.searchView = new SearchInputView(searchViewDefaultData);
    this.menuModel = new SearchMenuModel(menuModelDefaultData);
    this.menuView = new SearchMenuView(menuViewDefaultData);
    this.prevSearchState = this.searchModel.state;
    this.prevMenuState = this.menuModel.state;
    this.nextSearchState = null;
    this.nextMenuState = null;
  }

  reduceLiContents(data) {
    this.resetDefaultState(); // hilightCount 등 초기화를 위해
    this.prevSearchState = this.searchModel.state;
    const current = this.prevSearchState;
    current.toggle.liContents = data;
    this.nextSearchState = current;
    this.searchModel.state = this.nextSearchState;
    this.rendernextSearchState();
  }

  reduceHilightCount({ plusOrMinus, toggleList: toggleli }) {
    this.searchModel.state.toggleList = toggleli;
    this.searchModel.hilightCount = plusOrMinus;
    this.prevSearchState = this.searchModel.state;
    const current = this.prevSearchState; // 복사로 바꾸면 더 좋을듯
    if (current.prevHilightIdx < 0) {
      current.prevHilightIdx = 0;
    }
    this.nextSearchState = current;
    this.searchModel.state = this.nextSearchState;

    this.renderHilight();
  }

  reduceMenuData(menuData) {
    this.prevMenuState = this.menuModel.state;
    const current = this.prevMenuState;
    current.liContents = menuData;
    this.nextMenuState = current;
    this.menuModel.state = this.nextMenuState;

    this.menuView.render(this.menuModel.state);
  }

  rendernextSearchState() {
    this.searchView.render(this.nextSearchState.toggle);
  }

  renderHilight() {
    this.searchView.hilight(this.nextSearchState);
  }

  renderMenu() {
    this.menuView.render(this.nextMenuState);
  }

  resetDefaultState() {
    this.searchModel.state = defaultSearchState;
  }
}

export default Store;
