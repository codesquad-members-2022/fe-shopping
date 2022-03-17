import { SearchList } from "./search-list.js";

const searchbar = document.querySelector(".search__input");
const searchList = document.querySelector(".search__list");
const searchListContainer = document.querySelector(".search__list--container");
const recentSearchList = new SearchList();

const getSearchListItem = (item) => {
    return `<li class="search__list--item">${item}</li>`;
};

const add최근검색어 = (검색어) => {
    const listItem = getSearchListItem(검색어);
    searchListContainer.insertAdjacentElement("afterbegin", listItem);
};

searchbar.addEventListener("focus", () => {
    searchList.style.display = "block";
    recentSearchList.show();
});

document.body.addEventListener("click", ({ target }) => {
    if (!target.closest(".search")) {
        searchList.style.display = "none";
        recentSearchList.hide();
    }
});
