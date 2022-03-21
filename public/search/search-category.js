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
        this.arrowDown.style.display = "none";
        this.arrowUp.style.display = "block";
        this.categoryList.style.display = "block";
    }

    hideCategoryList() {
        this.isVisible = false;
        this.arrowDown.style.display = "block";
        this.arrowUp.style.display = "none";
        this.categoryList.style.display = "none";
    }
}
