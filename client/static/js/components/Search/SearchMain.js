import { DropdownList } from "../DropdownList.js";

export class SearchMain extends DropdownList {
  #searchMainDOM;
  #recentSearchData;

  constructor() {
    super();
    this.#recentSearchData = this.#getRecentSearchData();
    this.dropdownClassName = "search__recent";
  }

  #getRecentSearchData() {
    return JSON.parse(localStorage.getItem("recentSearch") || "[]");
  }

  #updateRecentSearchData(newData) {
    this.#recentSearchData.push(newData);
    localStorage.setItem(
      "recentSearch",
      JSON.stringify(this.#recentSearchData)
    );
  }

  get template() {
    return this.#getSearchMainTemplate();
  }

  #getSearchMainTemplate() {
    return `
      <div class="search__main">
        ${this.#getInputboxTemplate()}
        ${this.#getRecentboxTemplate()}  
      </div>
    `;
  }

  #getInputboxTemplate() {
    return `
      <div class="search__input">
        <input class="search__input-textbox" type="text" placeholder="찾고 싶은 상품을 검색해보세요!"/>
        <a class="search__input-voice-btn"></a>
        <button class="search__input-send-btn" type="submit"><span class="search-icon"></span></button>
      </div>
    `;
  }

  #getRecentboxTemplate() {
    return `
      <div class="search__recent">
        ${this.#getRecentBoxTitleTemplate()}
        ${this.getDropdownListTemplate(this.#recentSearchData)}
        ${this.#getRecentBoxUtilTemplate()}
      </div> 
    `;
  }

  #getRecentBoxTitleTemplate() {
    return `<div class="search__recent-title">최근 검색어</div>`;
  }

  #getRecentBoxUtilTemplate() {
    return `
      <div class="search__recent-util">
        <button class="search__recent-util--delete-all" type="button">전체삭제</button>
        <button class="search__recent-util--off" type="button">최근검색어끄기</button>
      </div>
    `;
  }

  activate() {
    this.#searchMainDOM = document.querySelector(".search__input");
    this.#addInputBoxFocusEvent();
    this.#addSubmitEvent();
    this.#addDeleteEvent();
  }

  #addInputBoxFocusEvent() {
    this.#searchMainDOM.addEventListener("focusin", (e) =>
      this.#toggleRecentBoxOpen(e)
    );
    // this.#searchMainDOM.addEventListener("focusout", (e) =>
    //   this.#toggleRecentBoxOpen(e)
    // );
  }

  #toggleRecentBoxOpen() {
    const recentBox = document.querySelector(".search__recent");
    recentBox.classList.toggle("search__recent--opened");
  }

  #addSubmitEvent() {
    const form = document.querySelector(".search");
    form.addEventListener("submit", (e) => this.#handleSubmitEvent(e));
  }

  #handleSubmitEvent(event) {
    event.preventDefault();
    console.log(event);
    const inputText = event.target.querySelector("input").value;
    this.#updateRecentSearchData(inputText);
    this.#addRecentSearchList(inputText);
    event.target.querySelector("input").value = "";
  }

  #addRecentSearchList(newText) {
    const recentSearchList = document.querySelector(".search__recent-list");
    recentSearchList.insertAdjacentHTML(
      "beforeend",
      this.getItemTemplate(newText)
    );
  }

  #addDeleteEvent() {
    const deleteBtn = document.querySelector(
      ".search__recent-util--delete-all"
    );
    deleteBtn.addEventListener("click", (e) => this.#deleteAll(e));
  }

  #deleteAll() {
    localStorage.removeItem("recentSearch");
    this.#recentSearchData = [];
    const recentSearchList = document.querySelector(".search__recent-list");
    recentSearchList.innerHTML = "";
  }
}
