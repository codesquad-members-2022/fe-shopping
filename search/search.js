import { SearchList } from "./search-list.js";
import { database } from "../data/tshirt.js";

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

const getRelatedWord = (word) => {
    if (database.has(word)) {
        relatedSearchList.searchItems = database
            .get(word)
            .map((it) => it.keyword);
    } else {
        return;
    }

    relatedSearchList.show();
    relatedSearchList.renderSearchList();
};

let timer;
const delay = (time) => {
    return new Promise((resolve) => {
        timer = setTimeout(resolve, time);
    });
};

searchbar.addEventListener("input", ({ target }) => {
    if (!target.value) {
        clearTimeout(timer);
        relatedSearchList.reset();
        relatedSearchList.hide();
    }

    if (timer) {
        clearTimeout(timer);
    }

    delay(500).then(() => getRelatedWord(target.value));
});

searchbar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        updateRecentSearchList();

        relatedSearchList.hide();
        relatedSearchList.reset();
    }
});

document.body.addEventListener("click", ({ target }) => {
    if (!target.closest(".search")) {
        recentSearchList.hide();
        relatedSearchList.hide();
    }
});
