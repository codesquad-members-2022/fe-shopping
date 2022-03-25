import SearchInputStore from "./search-input-store.js";
import SearchInputView from "./search-input-view.js";

export default class SearchInput {
    constructor(searchbar) {
        this.view = new SearchInputView(searchbar);
        this.store = new SearchInputStore();
    }

    getInput() {
        const input = this.store.getSearchInput();
        return input;
    }

    setInput() {
        const input = this.view.getSearchInput();
        this.store.setSearchInput(input);
    }

    changeInput(input) {
        this.store.changeSearchInput(input);
        const inputWord = this.store.getSearchInput();
        this.view.updateSearchBarInput(inputWord);
    }

    clearSearchInput() {
        this.view.clearSearchBar();
        this.store.initSearchInput();
    }
}
