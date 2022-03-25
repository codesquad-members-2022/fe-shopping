import { SearchCategory } from "../../view/header/search.-category.js";

export class SearchCategoryController {
  constructor() {
    this.view = new SearchCategory();
  }

  init() {
    this.view.render(this.view.template, ".search-wrap");
    this.setElements();
    this.bindEvents();
    this.view.on();
  }

  setElements() {
    this.view.$selectCategoryWrap = document.querySelector(
      ".select-category-wrap"
    );
    this.view.$selectCategoryList = document.querySelector(
      ".select-category-list"
    );
    this.view.$selectToggle = document.querySelector(".select-toggle");
    this.view.$selectCategory = document.querySelector(".select-category");
    this.view.dropdownToggle = false;
  }

  bindEvents() {
    this.view.categoryDropdownHandler = this.categoryDropdownHandler.bind(this);
    this.view.textContentHandler = this.textContentHandler.bind(this);
    this.view.otherClickHandler = this.otherClickHandler.bind(this);
  }

  categoryDropdownHandler(argArr) {
    argArr.forEach((v) => v.classList.toggle("is-opened"));
    this.dropdownToggle
      ? (this.dropdownToggle = false)
      : (this.dropdownToggle = true);
  }

  textContentHandler(e, tagname, changed) {
    if (e.target.tagName === tagname) {
      changed.textContent = e.target.textContent;
    }
  }

  otherClickHandler(e, argArr) {
    if (!e.target.parentNode.classList.contains("is-opened")) {
      if (this.dropdownToggle) {
        argArr.forEach((v) => v.classList.remove("is-opened"));
        this.dropdownToggle = false;
      }
    }
  }
}
