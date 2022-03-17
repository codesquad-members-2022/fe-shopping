class SearchList {
    constructor(searchList, listContainer) {
        this.searchListNode = searchList;
        this.listContainer = listContainer;
        this.searchItems = [];
        this.isVisible = false;
    }

    show() {
        this.isVisible = true;
        this.searchListNode.style.display = "block";
    }

    hide() {
        this.isVisible = false;
        this.searchListNode.style.display = "none";
    }

    addSearchWord(word) {
        this.searchItems.unshift(word);
        if (this.searchItems.length > 10) {
            this.searchItems = this.searchItems.slice(0, 10);
        }
    }

    getSearchListItem = (item) => {
        return `<li class="search__list--item">${item}</li>`;
    };

    renderSearchList() {
        const searchList = this.searchItems.reduce(
            (acc, item) => acc + this.getSearchListItem(item),
            ""
        );
        this.listContainer.innerHTML = searchList;
    }
}

export { SearchList };
