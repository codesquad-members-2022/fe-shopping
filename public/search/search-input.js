class SearchInput {
    constructor(searchbar) {
        this.searchInputNode = searchbar;
    }

    getInput() {
        return this.searchInputNode.value;
    }

    setInput(item) {
        this.searchInputNode.value = item.dataset.name;
    }

    clearSearchInput() {
        this.searchInputNode.value = "";
    }
}

export { SearchInput };
