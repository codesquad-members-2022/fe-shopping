class SearchList {
    MAX_ITEM = 9;

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

    getSearchListItem(...itemInfo) {
        const itemName = itemInfo[0];
        const idx = itemInfo[1];
        return `<li 
                    class="search__list--item grid" 
                    data-idx="${idx}" 
                    data-name="${itemName}">
                        <p class="search__list--item-text">${itemName}</p>
                        <p class="delete-btn">삭제</p>
                </li>`;
    }

    renderSearchList(input = "") {
        const searchList = this.searchItems.reduce(
            (acc, itemName, idx) =>
                acc + this.getSearchListItem(itemName, idx, input),
            ""
        );
        this.listContainer.innerHTML = searchList;
        this.focusItem();
    }

    focusItem() {
        const listItems = this.listContainer.querySelectorAll(
            ".search__list--item"
        );
        let focusingItem;

        listItems.forEach((item) => {
            const itemText = item.querySelector(".search__list--item-text");
            itemText.classList.remove("focus--underline");
            if (item.dataset.idx === this.curIdx.toString()) {
                focusingItem = item;
                itemText.classList.toggle("focus--underline");
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

    removeFocus() {
        if (this.curIdx !== -1) {
            this.curIdx = -1;
            this.renderSearchList();
        }
    }
}

export { SearchList };
