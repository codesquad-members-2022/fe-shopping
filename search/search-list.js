class SearchList {
    constructor() {
        this.searchList = [];
        this.isVisible = true;
        // this.searchListBlock = getSearchListTemplate();
    }

    show() {
        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
    }

    getSearchListTemplate() {
        // return
    }
}

export { SearchList };
