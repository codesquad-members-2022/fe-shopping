import { SearchInput } from "./search-input.js";
import { SearchCategory } from "./search-category/search-category.js";
import SearchListStore from "./search-list/search-list-store.js";
import RecentSearchList from "./search-list/recent-search-list/recent-search-list.js";
import RecentSearchListView from "./search-list/recent-search-list/recent-search-list-view.js";
import RecentSearchListStore from "./search-list/recent-search-list/recent-search-list-store.js";
import RelatedSearchList from "./search-list/related-search-list/related-search-list.js";
import RelatedSearchListView from "./search-list/related-search-list/related-search-list-view.js";

const searchbar = document.querySelector(".search__input");
const searchRecentList = document.querySelector(".search__recent-list");
const searchRecentListContainer = document.querySelector(
    ".search__recent-list--container"
);
const searchRelatedList = document.querySelector(".search__related-list");
const searchRelatedListContainer = document.querySelector(
    ".search__related-list--container"
);
const category = document.querySelector(".search__category");
const categoryList = document.querySelector(".search__category-list");

const DIRECTION_UP = "ArrowUp";
const DIRECTION_DOWN = "ArrowDown";
const ENTER = "Enter";

const searchInput = new SearchInput(searchbar);

const recentSearchListView = new RecentSearchListView(
    searchRecentList,
    searchRecentListContainer
);
const recentSearchListStore = new RecentSearchListStore();
const recentSearchList = new RecentSearchList(
    recentSearchListView,
    recentSearchListStore
);

const relatedSearchListView = new RelatedSearchListView(
    searchRelatedList,
    searchRelatedListContainer
);
const relatedSearchListStore = new SearchListStore();
const relatedSearchList = new RelatedSearchList(
    relatedSearchListView,
    relatedSearchListStore
);

const searchCategory = new SearchCategory(category, categoryList);

const getRelatedWords = async () => {
    const word = searchInput.getInput();
    const category = searchCategory.store.getSelectedCategory();
    try {
        const response = await fetch(
            "../search?" +
                new URLSearchParams({
                    keyword: word,
                    category: category,
                })
        );

        if (!response.ok) {
            const error = response.status;
            throw Error(error);
        }

        const searchItemsJSON = await response.json();
        const searchItems = searchItemsJSON.map((it) => it.keyword);
        relatedSearchList.store.setSearchItems(searchItems);
    } catch (error) {
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

const requestRelatedWordsNoMoreInput = () => {
    if (timer) {
        clearTimeout(timer);
    }

    delay(500).then(() => getRelatedWords());
};

const removeFocusOnSearchList = () => {
    recentSearchList.removeFocus();
    relatedSearchList.removeFocus();
};

const inputEventHandler = () => {
    removeFocusOnSearchList();

    const word = searchInput.getInput();
    if (!word) {
        relatedSearchList.reset();
        relatedSearchList.hide();
    }

    requestRelatedWordsNoMoreInput();
};

const updateRecentSearchList = () => {
    const word = searchInput.getInput();
    searchInput.clearSearchInput();
    recentSearchList.addSearchWord(word);
};

const reRenderSearchList = () => {
    updateRecentSearchList();

    clearTimeout(timer);
    relatedSearchList.reset();
    relatedSearchList.hide();
};

const focusItem = (direction, searchList) => {
    const focusingItem =
        direction === DIRECTION_UP
            ? searchList.focusPreviousItem()
            : searchList.focusNextItem();
    searchInput.setInput(focusingItem);
};

const executeArrowKey = (direction) => {
    const relatedSearchListIsVisible = relatedSearchList.store.getVisibility();
    relatedSearchListIsVisible
        ? focusItem(direction, relatedSearchList)
        : focusItem(direction, recentSearchList);
};

const searchInputkeyDownEventHandler = (event) => {
    event.stopPropagation();

    if (event.key === ENTER) {
        event.preventDefault();
        reRenderSearchList();
    }

    if (event.key === DIRECTION_UP || event.key == DIRECTION_DOWN) {
        executeArrowKey(event.key);
    }
};

const hideLists = () => {
    recentSearchList.hide();
    relatedSearchList.hide();
    searchCategory.hide();
};

const searchCategoryKeydownEventHandler = (event) => {
    event.preventDefault();

    if (event.key === DIRECTION_DOWN) {
        searchCategory.focusNextItem();
    }

    if (event.key === DIRECTION_UP) {
        searchCategory.focusPreviousItem();
    }

    if (event.key === ENTER) {
        searchCategory.hide();
    }
};

const deleteRecentItem = (target) => {
    const listItem = target.closest(".search__list--item");
    const idx2Delete = Number(listItem.dataset.idx);
    const curFocusingItemIdx = recentSearchList.store.getCurIdx();

    recentSearchList.store.deleteSearchWord(idx2Delete);

    if (idx2Delete === curFocusingItemIdx) {
        recentSearchList.store.initCurIdx();
        searchInput.clearSearchInput();
    } else if (idx2Delete < curFocusingItemIdx) {
        recentSearchList.store.setCurIdxPrevious();
        recentSearchList.focusItem();
    }

    recentSearchList.renderSearchList();
};

const recentSearchListClickEventHandler = (event) => {
    event.stopPropagation();
    const target = event.target;

    if (target.classList.contains("delete-btn")) {
        deleteRecentItem(target);
    }

    if (target.classList.contains("search__list--item-text")) {
        const clickedItem = target.closest(".search__list--item");
        searchInput.setInput(clickedItem);
    }
};

const relatedSearchListClickEventHandler = (event) => {
    event.stopPropagation();
    const target = event.target;

    if (target.classList.contains("search__list--item-text")) {
        const clickedItem = target.closest(".search__list--item");
        const clickedWord = clickedItem.dataset.name;

        relatedSearchList.hide();
        searchInput.clearSearchInput();
        recentSearchList.addSearchWord(clickedWord);
    }
};

const onSearchEvent = () => {
    document.body.addEventListener("click", ({ target }) => {
        if (!target.closest(".search")) {
            hideLists();
        }
    });
    document.body.addEventListener("keydown", (event) => {
        const searchCategoryIsVisible = searchCategory.store.getVisibility();
        if (searchCategoryIsVisible) {
            searchCategoryKeydownEventHandler(event);
        }
    });

    searchInput.searchInputNode.addEventListener("focus", () => {
        recentSearchList.show();
    });
    searchInput.searchInputNode.addEventListener(
        "keydown",
        searchInputkeyDownEventHandler
    );
    searchInput.searchInputNode.addEventListener("input", inputEventHandler);

    recentSearchList.view.listContainer.addEventListener(
        "click",
        recentSearchListClickEventHandler
    );

    relatedSearchList.view.listContainer.addEventListener(
        "click",
        relatedSearchListClickEventHandler
    );
};

export { onSearchEvent };
