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

    focusListItem(selectedIdx) {
        const listItems = this.listContainer.querySelectorAll(
            ".search__list--item"
        );
        let focusingItem;

        listItems.forEach((item) => {
            const itemText = item.querySelector(".search__list--item-text");
            itemText.classList.remove("focus--underline");
            if (item.dataset.idx === selectedIdx.toString()) {
                focusingItem = item;
                itemText.classList.add("focus--underline");
            }
        });

        return focusingItem;
    }
}
