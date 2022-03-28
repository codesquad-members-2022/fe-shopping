export default class SearchInputView {
    constructor(searchbar) {
        this.searchbar = searchbar;
    }

    initEvent() {
        this.searchbar.addEventListener(
            "focus",
            this.searchbarFocusEventHandler
        );
        this.searchbar.addEventListener(
            "keydown",
            this.searchbarKeyDownEventHandler
        );
        this.searchbar.addEventListener("input", this.inputEventHandler);

        document.body.addEventListener(
            "click",
            this.noneSearchbarClickEventHandler
        );
    }

    clearSearchBar() {
        this.searchbar.value = "";
    }

    updateSearchBarInput(input) {
        this.searchbar.value = input;
    }

    getSearchInput() {
        return this.searchbar.value;
    }
}
