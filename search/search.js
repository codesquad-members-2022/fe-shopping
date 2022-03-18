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

const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";

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

const getRelatedWords = (word) => {
    if (database.has(word)) {
        relatedSearchList.searchItems = database
            .get(word)
            .map((it) => it.keyword);
    } else {
        return;
    }

    relatedSearchList.show();
    relatedSearchList.renderSearchList(word);
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

const blurRecentSearchList = () => {
    if (recentSearchList.curIdx !== -1) {
        recentSearchList.curIdx = -1;
        recentSearchList.renderSearchList();
    }
};

const inputEventHandler = ({ target }) => {
    blurRecentSearchList();

    const word = target.value;
    if (!word) {
        relatedSearchList.reset();
        relatedSearchList.hide();
    }

    requestRelatedWordsNoMoreInput(word);
};

const reRenderSearchList = (event) => {
    event.preventDefault();
    updateRecentSearchList();
    recentSearchList.renderSearchList();

    clearTimeout(timer);
    relatedSearchList.reset();
    relatedSearchList.hide();
};

const changeInputWord = (focusingItem) => {
    searchbar.value = focusingItem.dataset.name;
};

const focusItem = (direction, searchList) => {
    const focusingItem =
        direction === DIRECTION_UP
            ? searchList.focusPreviousItem()
            : searchList.focusNextItem();
    changeInputWord(focusingItem);
};

const keyDownEventHandler = (event) => {
    if (event.key === "Enter") {
        reRenderSearchList(event);
    }

    if (event.key === "ArrowDown") {
        if (relatedSearchList.isVisible) {
            focusItem(DIRECTION_DOWN, relatedSearchList);
        } else if (recentSearchList.isVisible) {
            focusItem(DIRECTION_DOWN, recentSearchList);
        }
    }

    if (event.key === "ArrowUp") {
        if (relatedSearchList.isVisible) {
            focusItem(DIRECTION_UP, relatedSearchList);
        } else if (recentSearchList.isVisible) {
            focusItem(DIRECTION_UP, recentSearchList);
        }
    }
};

const hideSearchList = () => {
    recentSearchList.hide();
    relatedSearchList.hide();
};

const onSearchEvent = () => {
    searchbar.addEventListener("focus", () => {
        recentSearchList.show();
    });
    searchbar.addEventListener("blur", hideSearchList);
    searchbar.addEventListener("keydown", keyDownEventHandler);
    searchbar.addEventListener("input", inputEventHandler);
};

export { onSearchEvent };
