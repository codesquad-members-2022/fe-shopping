import SearchList from "../search-list.js";

export default class RelatedSearchList extends SearchList {
    constructor(view, store) {
        super(view, store);
    }

    renderSearchList(input) {
        const searchItems = this.store.getSearchItems();
        this.view.renderSearchList(input, searchItems);
        this.focusItem();
    }
}
