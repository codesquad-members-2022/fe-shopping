import { SearchList } from "./search-list.js";
import { SearchInput } from "./search-input.js";
import { SearchCategory } from "./search-category.js";

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
const arrowUp = document.querySelector(".arrow--up");
const arrowDown = document.querySelector(".arrow--down");

const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";

const searchInput = new SearchInput(searchbar);

const recentSearchList = new SearchList(
    searchRecentList,
    searchRecentListContainer
);
const relatedSearchList = new SearchList(
    searchRelatedList,
    searchRelatedListContainer
);

const searchCategory = new SearchCategory(
    category,
    categoryList,
    arrowUp,
    arrowDown
);

const getRelatedWords = async () => {
    const word = searchInput.getSearchWord();
    try {
        const response = await fetch(
            "../search?" +
                new URLSearchParams({
                    keyword: word,
                    category: searchCategory.selectedCategory,
                })
        );

        if (!response.ok) {
            const error = response.status;
            throw Error(error);
        }

        const searchItems = await response.json();
        relatedSearchList.searchItems = searchItems.map((it) => it.keyword);
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

const removeHighlightOnSearchListItem = () => {
    recentSearchList.removeFocus();
    relatedSearchList.removeFocus();
};

const inputEventHandler = () => {
    removeHighlightOnSearchListItem();

    const word = searchInput.getSearchWord();
    if (!word) {
        relatedSearchList.reset();
        relatedSearchList.hide();
    }

    requestRelatedWordsNoMoreInput();
};

const updateRecentSearchList = () => {
    const word = searchInput.getSearchWord();
    searchInput.clearSearchInput();
    recentSearchList.addSearchWord(word);
};

const reRenderSearchList = (event) => {
    event.preventDefault();
    updateRecentSearchList();
    recentSearchList.renderSearchList();

    clearTimeout(timer);
    relatedSearchList.reset();
    relatedSearchList.hide();
};

const focusItem = (direction, searchList) => {
    const focusingItem =
        direction === DIRECTION_UP
            ? searchList.focusPreviousItem()
            : searchList.focusNextItem();
    searchInput.setInputWord(focusingItem);
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

const clearRecentSearchList = () => {
    if (recentSearchList.isRecording) {
        recentSearchList.reset();
        recentSearchList.renderSearchList();
    }
};

const toggleRecord = ({ target }) => {
    const recordOnBlock = document.querySelector(".record-on");
    const recordOffBlock = document.querySelector(".record-off");

    if (recentSearchList.isRecording) {
        recordOnBlock.style.display = "none";
        recordOffBlock.style.display = "block";
        target.innerText = "최근검색어켜기";
    } else {
        recordOnBlock.style.display = "block";
        recordOffBlock.style.display = "none";
        target.innerText = "최근검색어끄기";
    }

    recentSearchList.isRecording = !recentSearchList.isRecording;
};

const searchCategoryEventHandler = () => {
    if (searchCategory.isVisible) {
        searchCategory.hideCategoryList();
    } else {
        searchCategory.showCategoryList();
    }
};

const hideLists = () => {
    recentSearchList.hide();
    relatedSearchList.hide();
    searchCategory.hideCategoryList();
};

const searchListItemEventHandler = ({ target }) => {
    if (target.classList.contains("search__category-list--item")) {
        searchCategory.changeSelectedCategory(target);
        searchCategory.hideCategoryList();
    }
};

const searchCategoryKeydownEventHandler = (event) => {
    if (event.key === "ArrowDown") {
        event.preventDefault();
        searchCategory.focusNextItem();
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();
        searchCategory.focusPreviousItem();
    }

    if (event.key === "Enter") {
        searchCategory.hideCategoryList();
    }
};

const deleteRecentItem = (event) => {
    event.stopPropagation();
    const target = event.target;

    if (target.classList.contains("delete-btn")) {
        const listItem = target.closest(".search__list--item");
        const idx2Delete = listItem.dataset.idx;
        recentSearchList.searchItems.splice(idx2Delete, 1);
        if (idx2Delete === recentSearchList.curIdx.toString()) {
            recentSearchList.curIdx = -1;
            searchInput.clearSearchInput();
        } else if (idx2Delete < recentSearchList.curIdx.toString()) {
            recentSearchList.curIdx -= 1;
            recentSearchList.focusItem();
        }
        recentSearchList.renderSearchList();
    }
};

const onSearchEvent = () => {
    document.body.addEventListener("click", ({ target }) => {
        if (!target.closest(".search")) {
            hideLists();
        }
    });
    document.body.addEventListener("keydown", (event) => {
        if (searchCategory.isVisible) {
            searchCategoryKeydownEventHandler(event);
        }
    });

    searchCategory.category.addEventListener(
        "click",
        searchCategoryEventHandler
    );
    searchCategory.categoryList.addEventListener(
        "click",
        searchListItemEventHandler
    );

    searchInput.searchInputNode.addEventListener("focus", () => {
        recentSearchList.show();
    });
    searchInput.searchInputNode.addEventListener(
        "keydown",
        keyDownEventHandler
    );
    searchInput.searchInputNode.addEventListener("input", inputEventHandler);

    recentSearchList.searchListNode
        .querySelector(".clear-all")
        .addEventListener("click", clearRecentSearchList);

    recentSearchList.searchListNode
        .querySelector(".record-btn")
        .addEventListener("click", toggleRecord);

    recentSearchList.listContainer.addEventListener("click", deleteRecentItem);
};

export { onSearchEvent };
