import { EventCategory } from "./Model/eventCategory.js";
import { HeaderMain } from "./views/headerMain.js";
import { SearchMenuDropBox } from "./views/searchMenuDropBoxView.js";
import { SearchContentDropBox } from "./views/searchContentDropBoxView.js";
import { TopBar } from "./views/topBar.js";
import { getLocalStorageForArray, setLocalStorageForArray } from "../component/local-storage.js";
import { SearchBar } from "./Model/searchBar.js";
import { DropBox } from "../component/dropbox.js";

export default class Controller {
  constructor() {
    this.topBar = new TopBar();
    this.headerMainView = new HeaderMain();
    this.eventCategory = new EventCategory();
    this.searchBar = new SearchBar();
    const menuDropBox = new DropBox(this.searchBar.menuInfo);
    const contDropBox = new DropBox(this.searchBar.contentInfo);
    this.searchViewMenuDropBox = new SearchMenuDropBox(menuDropBox);
    this.searchViewContentDropBox = new SearchContentDropBox(contDropBox);

    this.recentSearchKeyWord = "recentSearchKeyWord";
    this.render();
  }

  renderHeaderMain() {
    return this.eventCategory
      .exportDataPromise()
      .then((eventCategoryTemplate) => this.headerMainView.render(eventCategoryTemplate));
  }
  renderSearchMenuView() {
    return this.searchBar
      .getMenu()
      .then((searchMenudata) => this.searchViewMenuDropBox.render(searchMenudata));
  }
  renderSearchContentView(keyWord) {
    return this.searchBar.getContent(keyWord).then((data) => {
      return this.searchViewContentDropBox.render(data, keyWord);
    });
  }
  async render() {
    this.topBar.render();
    this.renderHeaderMain();
    await this.renderSearchMenuView();
    this.dropBoxEventRegister();
    this.searchBarEventRegister();
  }
  dropBoxEventRegister() {
    this.searchViewMenuDropBox.onDropBoxRenderEvent();
    this.searchViewContentDropBox.onDropBoxRenderEvent();
  }
  searchBarEventRegister() {
    this.onSearchBarInputEvent();
    this.onSubmitSearchBar();
    this.onSubmitSearchBarByButtonClick();
  }
  async createSearchBarAutoComplete(keyWord) {
    await this.renderSearchContentView(keyWord);
    this.searchViewContentDropBox.reRenderDropBox();
  }
  onSubmitSearchBarByButtonClick() {
    const searchButton = document.querySelector(".search-bar__search-button");
    searchButton.addEventListener("click", (evt) => {
      setLocalStorageForArray(this.recentSearchKeyWord, this.searchArea.value);
    });
  }
  onSearchBarInputEvent() {
    this.searchArea = document.querySelector(".search-bar__search-area");
    this.searchArea.addEventListener("input", (e) => {
      this.createSearchBarAutoComplete(this.searchArea.value);
    });
  }
  onSubmitSearchBar() {
    const searchForm = document.querySelector(".search-bar__form");
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      setLocalStorageForArray(this.recentSearchKeyWord, this.searchArea.value);
    });
  }
}
