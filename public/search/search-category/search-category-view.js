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

    focusCategoryItem(selectedIdx) {
        let focusingItem;

        this.categoryListItems.forEach((item) => {
            item.classList.remove("focus");
            if (item.dataset.idx === selectedIdx.toString()) {
                focusingItem = item;
                item.classList.toggle("focus");
            }
        });

        return focusingItem;
    }
}
