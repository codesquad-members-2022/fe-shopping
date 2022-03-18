class SearchInput {
    constructor(searchbar) {
        this.searchInputNode = searchbar;
    }

    getSearchWord() {
        return this.searchInputNode.value;
    }

    setInputWord(item) {
        this.searchInputNode.value = item.dataset.name;
    }

    clearSearchInput() {
        this.searchInputNode.value = "";
    }
}

export { SearchInput };
