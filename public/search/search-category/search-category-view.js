export default class SearchCategoryView {
    constructor(category, categoryList) {
        this.category = category;
        this.categoryList = categoryList;
        this.categorySelected = category.querySelector(
            ".search__category--selected"
        );
        this.categoryListItems = categoryList.querySelectorAll(
            ".search__category-list--item"
        );
        this.arrowUp = category.querySelector(".arrow--up");
        this.arrowDown = category.querySelector(".arrow--down");
    }

    initEvent() {
        this.category.addEventListener(
            "click",
            this.searchCategoryClickEventHandler
        );
        this.categoryList.addEventListener(
            "click",
            this.searchCategoryListItemClickEventHandler
        );

        document.body.addEventListener(
            "keydown",
            this.searchCategoryKeydownEventHandler
        );
    }

    showArrow(arrow) {
        arrow.style.display = "block";
    }

    hideArrow(arrow) {
        arrow.style.display = "none";
    }

    show() {
        this.categoryList.classList.replace("roll-up", "roll-down");
        this.showArrow(this.arrowUp);
        this.hideArrow(this.arrowDown);
    }

    hide() {
        this.categoryList.classList.replace("roll-down", "roll-up");
        this.showArrow(this.arrowDown);
        this.hideArrow(this.arrowUp);
    }

    changeSelectedCategory(selectedCategory) {
        this.categorySelected.textContent = selectedCategory;
    }

    resetFocus() {
        this.categoryListItems.forEach((item) =>
            item.classList.remove("focus")
        );
    }

    focusCategoryItem(selectedIdx) {
        this.resetFocus();
        const focusingItem = [...this.categoryListItems].find(
            (item) => item.dataset.idx === selectedIdx.toString()
        );

        if (focusingItem) {
            focusingItem.classList.add("focus");
        }

        return focusingItem;
    }

    autoScrollDown(curIdx) {
        const LIST_ITEM_HEIGHT = 32;
        const clientHeight = this.categoryList.clientHeight;
        const numOfItemsDisplayed = Math.ceil(clientHeight / LIST_ITEM_HEIGHT);
        const halfNumOfItemsDisplayed = Math.ceil(numOfItemsDisplayed / 2);

        if (curIdx === 0) {
            this.categoryList.scrollTop = 0;
        } else if (
            curIdx >= numOfItemsDisplayed &&
            (curIdx - numOfItemsDisplayed) % halfNumOfItemsDisplayed === 0
        ) {
            this.categoryList.scrollTop += clientHeight / 2;
        }
    }

    autoScrollUp(curIdx, lastIdx) {
        const LIST_ITEM_HEIGHT = 32;
        const clientHeight = this.categoryList.clientHeight;
        const numOfItemsDisplayed = Math.ceil(clientHeight / LIST_ITEM_HEIGHT);
        const halfNumOfItemsDisplayed = Math.ceil(numOfItemsDisplayed / 2);

        if (curIdx === lastIdx) {
            this.categoryList.scrollTop = this.categoryList.scrollHeight;
        }
        // 나머지 조건 추가해야함
    }
}
