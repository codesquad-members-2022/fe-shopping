import { CategoryDropBox, SearchBarDropBox } from "./dropbox.js";
import SearchEngine from "./searchEngine.js";

export function searchBarDropBoxEvent() {
  const searchBarDropbox = new SearchBarDropBox("search-bar-dropbox-id");
  const $searchBarDropbox = document.querySelector("#search-bar-content-id");
  const $dropboxContents = document.querySelectorAll(
    ".search-bar-dropbox-content"
  );
  $searchBarDropbox.addEventListener("click", function () {
    searchBarDropbox.toggleDropbox();
  });
  $dropboxContents.forEach((content) => {
    content.addEventListener("click", function (e) {
      searchBarDropbox.changeContentText(e.target);
    });
  });
}

export function categoryDropBoxEvent() {
  const categoryDropbox = new CategoryDropBox("category-dropbox-id");
  const $category = document.querySelector("#category");
  $category.addEventListener("mouseover", function () {
    categoryDropbox.showDropbox();
  });
  $category.addEventListener("mouseout", function () {
    categoryDropbox.hideDropbox();
  });
}
export function searchEngineEvent() {
  const searchInput = document.querySelector("#search-keyboard-id");
  const searchEngine = new SearchEngine(searchInput);
  searchInput.addEventListener(
    "keydown",
    debounce(() => {
      searchEngine.saveSearchingValue();
    }, 500)
  );
  searchInput.addEventListener("focus", function () {
    searchEngine.showDropbox();
    searchEngine.renderRecentSearch();
    searchEngine.renderSearchingValue();
  });
  searchInput.addEventListener("blur", function () {
    searchEngine.removeRecentSearch();
    searchEngine.hideDropbox();
  });
}
export function debounce(callback, delay) {
  let timerId;
  return (event) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
}
