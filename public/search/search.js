import { DIRECTION_UP, DIRECTION_DOWN, ENTER, debounce } from "../utils.js";

export default class Search {
    constructor(
        searchInput,
        recentSearchList,
        relatedSearchList,
        searchCategory
    ) {
        this.searchInput = searchInput;
        this.recentSearchList = recentSearchList;
        this.relatedSearchList = relatedSearchList;
        this.searchCategory = searchCategory;

        this.debounce = this.initDebounce();
    }

    setEventHandler() {
        this.recentSearchList.view.recentSearchListClickEventHandler =
            this.recentSearchListClickEventHandler.bind(this);

        this.relatedSearchList.view.relatedSearchListClickEventHandler =
            this.relatedSearchListClickEventHandler.bind(this);

        this.searchInput.view.searchbarFocusEventHandler =
            this.searchbarFocusEventHandler.bind(this);
        this.searchInput.view.searchbarKeyDownEventHandler =
            this.searchbarkeyDownEventHandler.bind(this);
        this.searchInput.view.inputEventHandler =
            this.inputEventHandler.bind(this);
        this.searchInput.view.noneSearchbarClickEventHandler =
            this.noneSearchbarClickEventHandler.bind(this);
    }

    initEvents() {
        this.setEventHandler();

        this.recentSearchList.view.initEvent();
        this.relatedSearchList.view.initEvent();
        this.searchInput.view.initEvent();
    }

    initDebounce() {
        const DELAY = 500;
        return debounce(DELAY);
    }

    noneSearchbarClickEventHandler({ target }) {
        if (!target.closest(".search")) {
            this.recentSearchList.hide();
            this.relatedSearchList.hide();
            this.searchCategory.hide();
        }
    }

    async getRelatedWords() {
        // 연관 검색어 목록을 키보드로 이동했을 때 요청하지 않도록 처리
        const relatedSearchListCurIdx =
            this.relatedSearchList.store.getCurIdx();
        if (relatedSearchListCurIdx !== -1) {
            return;
        }

        const word = this.searchInput.getInput();
        const category = this.searchCategory.store.getSelectedCategory();
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
            this.relatedSearchList.store.setSearchItems(searchItems);
        } catch (error) {
            return;
        }

        this.relatedSearchList.show();
        this.relatedSearchList.renderSearchList(word);
    }

    removeFocusOnSearchList() {
        this.recentSearchList.removeFocus();
        this.relatedSearchList.removeFocus();
    }

    inputEventHandler() {
        this.removeFocusOnSearchList();

        this.searchInput.setInput();
        const word = this.searchInput.getInput();
        if (!word) {
            this.relatedSearchList.reset();
            this.relatedSearchList.hide();
        }

        this.debounce().then(() => this.getRelatedWords());
    }

    updateRecentSearchList() {
        const word = this.searchInput.getInput();
        this.searchInput.clearSearchInput();
        this.recentSearchList.addSearchWord(word);
    }

    reRenderSearchList() {
        this.updateRecentSearchList();
        this.relatedSearchList.reset();
        this.relatedSearchList.hide();
    }

    focusItem(direction, searchList) {
        const focusingItem =
            direction === DIRECTION_UP
                ? searchList.focusPreviousItem()
                : searchList.focusNextItem();
        this.searchInput.changeInput(focusingItem);
    }

    executeArrowKey(direction) {
        const relatedSearchListIsVisible =
            this.relatedSearchList.store.getVisibility();
        relatedSearchListIsVisible
            ? this.focusItem(direction, this.relatedSearchList)
            : this.focusItem(direction, this.recentSearchList);
    }

    searchbarkeyDownEventHandler(event) {
        event.stopPropagation();

        if (event.key === ENTER) {
            event.preventDefault();
            this.reRenderSearchList();
        }

        if (event.key === DIRECTION_UP || event.key == DIRECTION_DOWN) {
            this.executeArrowKey(event.key);
        }
    }

    searchbarFocusEventHandler() {
        this.recentSearchList.show();
    }

    deleteRecentItem(target) {
        const listItem = target.closest(".search__list--item");
        const idx2Delete = Number(listItem.dataset.idx);
        const curFocusingItemIdx = this.recentSearchList.store.getCurIdx();

        this.recentSearchList.store.deleteSearchWord(idx2Delete);

        if (idx2Delete === curFocusingItemIdx) {
            this.recentSearchList.store.initCurIdx();
            this.searchInput.clearSearchInput();
        } else if (idx2Delete < curFocusingItemIdx) {
            this.recentSearchList.store.setCurIdxPrevious();
            this.recentSearchList.focusItem();
        }

        this.recentSearchList.renderSearchList();
    }

    recentSearchListClickEventHandler(event) {
        event.stopPropagation();
        const target = event.target;

        if (target.classList.contains("delete-btn")) {
            this.deleteRecentItem(target);
        }

        if (target.classList.contains("search__list--item-text")) {
            const clickedItem = target.closest(".search__list--item");
            this.searchInput.changeInput(clickedItem);
        }
    }

    relatedSearchListClickEventHandler(event) {
        event.stopPropagation();
        const target = event.target;

        if (target.classList.contains("search__list--item-text")) {
            const clickedItem = target.closest(".search__list--item");
            const clickedWord = clickedItem.dataset.name;

            this.relatedSearchList.hide();
            this.searchInput.clearSearchInput();
            this.recentSearchList.addSearchWord(clickedWord);
        }
    }
}
