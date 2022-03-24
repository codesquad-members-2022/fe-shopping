export class SearchCategory {
    CATEGORY_LENGTH = 31;

    constructor(category, categoryList, arrowUp, arrowDown) {
        this.category = category;
        this.categorySelected = category.querySelector(
            ".search__category--selected"
        );
        this.categoryList = categoryList;
        this.arrowUp = arrowUp;
        this.arrowDown = arrowDown;
        this.selectedCategory = "all";
        this.selectedCategoryName = "전체";
        this.isVisible = false;
        this.curIdx = -1;
    }

    showArrow(arrow) {
        arrow.style.display = "block";
    }

    hideArrow(arrow) {
        arrow.style.display = "none";
    }

    show() {
        this.isVisible = true;
        this.categoryList.classList.replace("roll-up", "roll-down");
        this.showArrow(this.arrowUp);
        this.hideArrow(this.arrowDown);
        this.focusItem();
    }

    hide() {
        this.isVisible = false;
        this.categoryList.classList.replace("roll-down", "roll-up");
        this.showArrow(this.arrowDown);
        this.hideArrow(this.arrowUp);
    }

    changeCategory(newCategory) {
        this.selectedCategoryName = newCategory.dataset.categoryName;
        this.selectedCategory = newCategory.dataset.category;
        this.curIdx = Number(newCategory.dataset.idx);
        this.categorySelected.innerText = this.selectedCategoryName;
    }

    focusItem() {
        const listItems = this.categoryList.querySelectorAll(
            ".search__category-list--item"
        );
        let focusingItem;

        listItems.forEach((item) => {
            item.classList.remove("focus");
            if (item.dataset.idx === this.curIdx.toString()) {
                focusingItem = item;
                item.classList.toggle("focus");
            }
        });

        return focusingItem;
    }

    focusNextItem() {
        this.curIdx += 1;
        if (this.curIdx >= this.CATEGORY_LENGTH) {
            this.curIdx = 0;
        }

        const focusingItem = this.focusItem();

        this.changeCategory(focusingItem);
    }

    focusPreviousItem() {
        this.curIdx -= 1;
        if (this.curIdx < 0) {
            this.curIdx = this.CATEGORY_LENGTH - 1;
        }

        const focusingItem = this.focusItem();

        this.changeCategory(focusingItem);
    }
}
