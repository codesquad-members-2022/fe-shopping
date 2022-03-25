export default class SearchInputStore {
    constructor() {
        this.searchInputValue = "";
    }

    initSearchInput() {
        this.searchInputValue = "";
    }

    changeSearchInput(input) {
        this.searchInputValue = input.dataset.name;
    }

    getSearchInput() {
        return this.searchInputValue;
    }

    setSearchInput(inputValue) {
        this.searchInputValue = inputValue;
    }
}
