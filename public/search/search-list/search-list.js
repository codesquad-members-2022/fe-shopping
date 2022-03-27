export default class SearchList {
    constructor(view, store) {
        this.view = view;
        this.store = store;
    }

    show() {
        this.view.show();
        this.store.setVisibility(true);
    }

    hide() {
        this.view.hide();
        this.store.setVisibility(false);
        this.store.initCurIdx();
    }

    reset() {
        this.store.initSearchItems();
    }

    focusItem() {
        const selectedItemIdx = this.store.getCurIdx();
        const focusingItem = this.view.focusListItem(selectedItemIdx);

        return focusingItem;
    }

    focusNextItem() {
        this.store.setCurIdxNext();
        const focusingItem = this.focusItem();
        return focusingItem;
    }

    focusPreviousItem() {
        this.store.setCurIdxPrevious();
        const focusingItem = this.focusItem();
        return focusingItem;
    }

    removeFocus() {
        this.store.initCurIdx();
        this.focusItem();
    }
}

export { SearchList };
