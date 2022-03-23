class SearchList {
    MAX_ITEM = 9;

    constructor(searchList, listContainer) {
        this.searchListNode = searchList;
        this.listContainer = listContainer;
        this.searchItems = [];
        this.isVisible = false;
        this.curIdx = -1;
        this.isRecording = true;
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
        if (this.isRecording) {
            this.searchItems.unshift(word);
            if (this.searchItems.length > this.MAX_ITEM) {
                this.searchItems = this.searchItems.slice(0, this.MAX_ITEM);
            }
        }
        this.curIdx = -1;
    }

    getItemText(itemName, input) {
        let itemText = itemName;
        const inputRegex = new RegExp(`${input}`);
        const matchWord = inputRegex.exec(itemName);
        if (matchWord) {
            itemText =
                itemName.slice(0, matchWord.index) +
                `<strong class="match-word">${input}</strong>` +
                itemName.slice(matchWord.index + input.length);
        }

        return itemText;
    }

    getSearchListItem(itemName, idx, input) {
        const itemText = this.getItemText(itemName, input);
        return `<li 
                    class="search__list--item grid" 
                    data-idx="${idx}" 
                    data-name="${itemName}">
                        <p class="search__list--item-text">${itemText}</p>
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
