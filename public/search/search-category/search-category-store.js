export default class SearchCategoryStore {
    constructor() {
        this.selectedCategory = "all";
        this.selectedCategoryName = "전체";
        this.isVisible = false;
        this.curIdx = 0;
        this.CATEGORY_LENGTH = 31;
    }

    getLastIdx() {
        return this.CATEGORY_LENGTH - 1;
    }

    setVisibility(booleanValue) {
        this.isVisible = booleanValue;
    }

    getVisibility() {
        return this.isVisible;
    }

    setCurIdx(selectedCategory) {
        this.curIdx = Number(selectedCategory.dataset.idx);
    }

    setCurIdxNext() {
        this.curIdx =
            this.curIdx + 1 >= this.CATEGORY_LENGTH ? 0 : this.curIdx + 1;
    }

    setCurIdxPrevious() {
        this.curIdx =
            this.curIdx - 1 < 0 ? this.CATEGORY_LENGTH - 1 : this.curIdx - 1;
    }

    getCurIdx() {
        return this.curIdx;
    }

    setCategory(selectedCategory) {
        this.selectedCategory = selectedCategory.dataset.category;
        this.selectedCategoryName = selectedCategory.dataset.categoryName;
    }

    getSelectedCategory() {
        return this.selectedCategory;
    }

    getSelectedCategoryName() {
        return this.selectedCategoryName;
    }
}
