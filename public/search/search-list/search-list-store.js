export default class SearchListStore {
    constructor() {
        this.searchItems = [];
        this.isVisible = false;
        this.curIdx = -1;
    }

    setVisibility(booleanValue) {
        this.isVisible = booleanValue;
    }

    getVisibility() {
        return this.isVisible;
    }

    initSearchItems() {
        this.searchItems = [];
    }

    setSearchItems(searchItems) {
        this.searchItems = searchItems;
    }

    getSearchItems() {
        return this.searchItems;
    }

    initCurIdx() {
        this.curIdx = -1;
    }

    setCurIdxNext() {
        this.curIdx =
            this.curIdx + 1 >= this.searchItems.length ? 0 : this.curIdx + 1;
    }

    setCurIdxPrevious() {
        this.curIdx =
            this.curIdx - 1 < 0 ? this.searchItems.length - 1 : this.curIdx - 1;
    }

    getCurIdx() {
        return this.curIdx;
    }
}
