class SearchList {
    constructor(searchList, listContainer) {
        this.searchListNode = searchList;
        this.listContainer = listContainer;
        this.searchItems = [];
        this.isVisible = false;
        this.curIdx = -1;
    }

    show() {
        this.isVisible = true;
        this.searchListNode.style.display = "block";
    }

    hide() {
        this.isVisible = false;
        this.searchListNode.style.display = "none";
        this.curIdx = -1;
    }

    reset() {
        this.searchItems = [];
    }

    addSearchWord(word) {
        this.searchItems.unshift(word);
        if (this.searchItems.length > 10) {
            this.searchItems = this.searchItems.slice(0, 10);
        }
        this.curIdx = -1;
    }

    getSearchListItem = (item, idx) => {
        return `<li class="search__list--item" data-idx="${idx}" data-name="${item}">${item}</li>`;
    };

    renderSearchList() {
        const searchList = this.searchItems.reduce(
            (acc, item, idx) => acc + this.getSearchListItem(item, idx),
            ""
        );
        this.listContainer.innerHTML = searchList;

        if (this.curIdx !== -1) {
            this.focusItem();
        }
    }

    focusItem() {
        const listItems = this.listContainer.querySelectorAll(
            ".search__list--item"
        );
        let focusingItem;

        listItems.forEach((item) => {
            if (item.dataset.idx === this.curIdx.toString()) {
                focusingItem = item;
                Object.assign(item.style, {
                    textDecoration: "underline",
                    color: "#228be6",
                });
            } else {
                Object.assign(item.style, {
                    textDecoration: "none",
                    color: "black",
                });
            }
        });

        return focusingItem;
    }

    focusNextItem() {
        this.curIdx += 1;
        if (this.curIdx >= this.searchItems.length) {
            this.curIdx = 0;
        }

        const focusingItem = this.focusItem();

        return focusingItem;
    }

    focusPreviousItem() {
        this.curIdx -= 1;
        if (this.curIdx < 0) {
            this.curIdx = this.searchItems.length - 1;
        }

        const focusingItem = this.focusItem();

        return focusingItem;
    }
}

export { SearchList };
