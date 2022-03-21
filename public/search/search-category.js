export class SearchCategory {
    constructor(category, categoryList, arrowUp, arrowDown) {
        this.category = category;
        this.categoryList = categoryList;
        this.arrowUp = arrowUp;
        this.arrowDown = arrowDown;
        this.isVisible = false;
    }

    showCategoryList() {
        this.isVisible = true;
        this.categoryList.classList.remove("roll-up");
        this.categoryList.classList.add("roll-down");
        this.arrowDown.style.display = "none";
        this.arrowUp.style.display = "block";
    }

    hideCategoryList() {
        this.isVisible = false;
        this.categoryList.classList.remove("roll-down");
        this.categoryList.classList.add("roll-up");
        this.arrowDown.style.display = "block";
        this.arrowUp.style.display = "none";
    }
}
