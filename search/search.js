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
};

searchbar.addEventListener("focus", () => {
    recentSearchList.show();
});

const getRelatedWords = (word) => {
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

const requestRelatedWordsNoMoreInput = (word) => {
    if (timer) {
        clearTimeout(timer);
    }

    delay(500).then(() => getRelatedWords(word));
};

const inputEventHandler = ({ target }) => {
    const word = target.value;
    if (!word) {
        relatedSearchList.reset();
        relatedSearchList.hide();
    }

    requestRelatedWordsNoMoreInput(word);
};

searchbar.addEventListener("input", inputEventHandler);

const reRenderSearchList = (event) => {
    event.preventDefault();
    updateRecentSearchList();
    recentSearchList.renderSearchList();

    clearTimeout(timer);
    relatedSearchList.reset();
    relatedSearchList.hide();
};

const keyDownEventHandler = (event) => {
    if (event.key === "Enter") {
        reRenderSearchList(event);
    }

    if (event.key === "ArrowDown") {
        if (relatedSearchList.isVisible) {
            relatedSearchList.focusNextItem();
        } else if (recentSearchList.isVisible) {
            recentSearchList.focusNextItem();
        }
    }

    if (event.key === "ArrowUp") {
        if (relatedSearchList.isVisible) {
            relatedSearchList.focusPreviousItem();
        } else if (recentSearchList.isVisible) {
            recentSearchList.focusPreviousItem();
        }
    }
};

searchbar.addEventListener("keydown", keyDownEventHandler);

const isSearchBlock = (target) => {
    return target.closest(".search");
};

const hideSearchList = () => {
    recentSearchList.hide();
    relatedSearchList.hide();
};

document.body.addEventListener("click", ({ target }) => {
    if (!isSearchBlock(target)) {
        hideSearchList();
    }
});
