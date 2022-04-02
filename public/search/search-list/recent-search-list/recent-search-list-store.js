import SearchListStore from "../search-list-store.js";

export default class RecentSearchListStore extends SearchListStore {
    constructor() {
        super();
        this.isRecording = true;
    }

    toggleRecordingState() {
        this.isRecording = !this.isRecording;
    }

    getRecordingState() {
        return this.isRecording;
    }

    addSearchWord(word) {
        this.searchItems.unshift(word);
        this.searchItems = this.searchItems.slice(0, this.MAX_ITEMS);
    }

    deleteSearchWord(idx2Delete) {
        this.searchItems.splice(idx2Delete, 1);
    }
}
