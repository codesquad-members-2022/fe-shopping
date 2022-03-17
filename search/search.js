import { SearchList } from "./search-list.js";

const searchbar = document.querySelector(".search__input");
const searchRecentList = document.querySelector(".search__recent-list");
const searchRecentListContainer = document.querySelector(
    ".search__recent-list--container"
);
const searchRelatedList = document.querySelector(".search__related-list");
const searchRelatedListContainer = document.querySelector(
    ".search__related-list--container"
);

const recentSearchList = new SearchList(
    searchRecentList,
    searchRecentListContainer
);
const relatedSearchList = new SearchList(
    searchRelatedList,
    searchRelatedListContainer
);

const getSearchWord = () => {
    const word = searchbar.value;
    searchbar.value = "";

    return word;
};

const updateRecentSearchList = () => {
    const word = getSearchWord();
    recentSearchList.addSearchWord(word);
    recentSearchList.renderSearchList();
};

searchbar.addEventListener("focus", () => {
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
        searchRecentList.style.display = "none";
        recentSearchList.hide();
    }
});
