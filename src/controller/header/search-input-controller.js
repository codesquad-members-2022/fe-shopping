import { AutoCompleteStore } from "../../model/autocomplete-store.js";
import { RecentKeywordStore } from "../../model/recent-keyword-store.js";
import { SearchInput } from "../../view/header/search-input.js";

export class SearchInputController {
  constructor() {
    this.view = new SearchInput();

    this.recentKeywordStore = new RecentKeywordStore();
    this.autoKeywordStore = new AutoCompleteStore();

    this.keywordDisplayToggle = false;
  }

  init() {
    this.view.render(this.view.template, ".search-wrap");
    this.setElements();
    this.bindEvents();
    this.view.on();
  }

  setElements() {
    this.view.$searchInput = document.querySelector(".search-input");
    this.view.$searchList = document.querySelector(".search-list");
    this.view.$searchListUl = document.querySelector(".search-list__contents");
    this.view.$searchHelper = document.querySelector(".search-helper");
    this.view.$deleteBtn = document.querySelector(".search-helper__delete");
  }

  bindEvents() {
    this.view.inputEnterHandler = this.inputEnterHandler.bind(this);
    this.view.inputClickHandler = this.inputClickHandler.bind(this);
    this.view.otherClickHandler = this.otherClickHandler.bind(this);
    this.view.storageClear = this.storageClear.bind(this);
    this.view.autoCompleteHandler = this.autoCompleteHandler.bind(this);
  }

  inputEnterHandler(e) {
    if (e.key === "Enter") {
      localStorage.setItem(`${Date.now()}`, `${this.view.$searchInput.value}`);
      this.recentKeywordStore.localStorageArr.unshift(
        this.view.$searchInput.value
      );
      this.view.$searchInput.value = "";
    }
  }

  inputClickHandler() {
    this.keywordDisplayToggleOn();

    if (!this.view.$searchInput.value) {
      if (this.recentKeywordStore.localStorageArr.length === 0) {
        this.keywordDisplayToggleOff();
        return;
      }
      this.recentKeywordStore.setLocalStorageArr();
      this.view.reRenderRecentKeyword(this.recentKeywordStore.localStorageArr);
    }
  }

  storageClear() {
    localStorage.clear();
    this.recentKeywordStore.localStorageArr = [];
    this.keywordDisplayToggleOff();
    this.view.$searchListUl.innerHTML = "";
  }

  async autoCompleteHandler() {
    this.keywordDisplayToggleOn();

    if (!this.view.$searchInput.value) {
      this.inputClickHandler();
    } else {
      await this.autoKeywordStore.setKeywordArr(this.view.$searchInput.value);
      this.view.reRenderAutoComplete(this.autoKeywordStore.keywordData);
    }
  }

  otherClickHandler(e) {
    if (e.target.className === "search-input") return;
    if (!e.target.parentNode.classList.contains("search-list is-opened")) {
      if (this.keywordDisplayToggle) {
        this.keywordDisplayToggleOff();
      }
    }
  }

  keywordDisplayToggleOn() {
    this.view.$searchList.classList.add("is-opened");
    this.keywordDisplayToggle = true;
  }

  keywordDisplayToggleOff() {
    this.view.$searchList.classList.remove("is-opened");
    this.keywordDisplayToggle = false;
  }
}
