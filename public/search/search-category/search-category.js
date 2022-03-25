import SearchCategoryView from "./search-category-view.js";
import SearchCategoryStore from "./search-category-store.js";

export class SearchCategory {
    constructor(category, categoryList) {
        this.view = new SearchCategoryView(category, categoryList);
        this.store = new SearchCategoryStore();

        this.setEventHandler();
    }

    setEventHandler() {
        this.view.searchCategoryClickEventHandler =
            this.searchCategoryClickEventHandler.bind(this);
        this.view.searchCategoryListItemClickEventHandler =
            this.searchCategoryListItemClickEventHandler.bind(this);

        this.view.initEvent();
    }

    searchCategoryClickEventHandler() {
        const isVisible = this.store.getVisibility();
        if (isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    searchCategoryListItemClickEventHandler({ target }) {
        if (target.classList.contains("search__category-list--item")) {
            this.changeCategory(target);
            this.hide();
        }
    }

    show() {
        this.view.show();
        this.focusItem();
        this.store.setVisibility(true);
    }

    hide() {
        this.view.hide();
        this.store.setVisibility(false);
    }

    changeCategory(selectedCategory) {
        this.store.setCategory(selectedCategory);
        this.store.setCurIdx(selectedCategory);

        const selectedCategoryName = this.store.getSelectedCategoryName();
        this.view.changeSelectedCategory(selectedCategoryName);
    }

    focusItem() {
        const selecedItemIdx = this.store.getCurIdx();
        const focusingItem = this.view.focusCategoryItem(selecedItemIdx);

        return focusingItem;
    }

    focusNextItem() {
        this.store.setCurIdxNext();
        const focusingItem = this.focusItem();
        this.changeCategory(focusingItem);
    }

    focusPreviousItem() {
        this.store.setCurIdxPrevious();
        const focusingItem = this.focusItem();
        this.changeCategory(focusingItem);
    }
}
