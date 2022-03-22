export class SearchCategory {
    constructor(category, categoryList, arrowUp, arrowDown) {
        this.category = category;
        this.categorySelected = category.querySelector(
            ".search__category--selected"
        );
        this.categoryList = categoryList;
        this.arrowUp = arrowUp;
        this.arrowDown = arrowDown;
        this.isVisible = false;
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
}
