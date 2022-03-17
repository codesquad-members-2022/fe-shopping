import { SearchList } from "./search-list.js";

const searchbar = document.querySelector(".search__input");
const searchList = document.querySelector(".search__list");
const searchListContainer = document.querySelector(".search__list--container");
const recentSearchList = new SearchList();

const getSearchListItem = (item) => {
    return `<li class="search__list--item">${item}</li>`;
};

const renderSearchList = (items) => {
    const searchList = items
        .slice(0, 10)
        .reduce((acc, item) => acc + getSearchListItem(item), "");
    searchListContainer.innerHTML = searchList;
};

const getSearchWord = () => {
    const word = searchbar.value;
    searchbar.value = "";

    return word;
};

const updateRecentSearchList = () => {
    const word = getSearchWord();
    recentSearchList.addSearchWord(word);
    renderSearchList(recentSearchList.searchList);
};

searchbar.addEventListener("focus", () => {
    searchList.style.display = "block";
    recentSearchList.show();
});

searchbar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        updateRecentSearchList();
    }
});

document.body.addEventListener("click", ({ target }) => {
    if (!target.closest(".search")) {
        searchList.style.display = "none";
        recentSearchList.hide();
    }
});
