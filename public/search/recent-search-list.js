import { SearchList } from "./search-list.js";

class RecentSearchList extends SearchList {
    constructor(searchList, listContainer) {
        super(searchList, listContainer);
        this.isRecording = true;
    }

    addSearchWord(word) {
        if (this.isRecording) {
            this.searchItems.unshift(word);
            if (this.searchItems.length > this.MAX_ITEM) {
                this.searchItems = this.searchItems.slice(0, this.MAX_ITEM);
            }
        }
        this.curIdx = -1;
    }
}

export { RecentSearchList };
