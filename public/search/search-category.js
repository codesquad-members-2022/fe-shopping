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

    showCategoryList() {
        this.isVisible = true;
        this.categoryList.classList.replace("roll-up", "roll-down");
        this.arrowDown.style.display = "none";
        this.arrowUp.style.display = "block";
    }

    hideCategoryList() {
        this.isVisible = false;
        this.categoryList.classList.replace("roll-down", "roll-up");
        this.arrowDown.style.display = "block";
        this.arrowUp.style.display = "none";
    }

    changeSelectedCategory(newCategory) {
        this.selectedCategoryName = newCategory.innerText;
        this.selectedCategory = newCategory.dataset.category;
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

        this.changeSelectedCategory(focusingItem);
    }

    focusPreviousItem() {
        this.curIdx -= 1;
        if (this.curIdx < 0) {
            this.curIdx = this.CATEGORY_LENGTH - 1;
        }

        const focusingItem = this.focusItem();

        this.changeSelectedCategory(focusingItem);
    }
}
