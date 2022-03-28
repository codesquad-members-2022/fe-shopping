export default class SearhListView {
    constructor(searchList, listContainer) {
        this.searchList = searchList;
        this.listContainer = listContainer;
    }

    show() {
        this.searchList.style.display = "block";
    }

    hide() {
        this.searchList.style.display = "none";
    }

    resetFocus(listItems) {
        listItems.forEach((item) => {
            item.classList.remove("focus--underline");
        });
    }

    focusListItem(selectedIdx) {
        const listItems = this.listContainer.querySelectorAll(
            ".search__list--item"
        );
        this.resetFocus(listItems);

        const focusingItem = [...listItems].find(
            (item) => item.dataset.idx === selectedIdx.toString()
        );

        if (focusingItem) {
            focusingItem.classList.add("focus--underline");
        }

        return focusingItem;
    }
}
