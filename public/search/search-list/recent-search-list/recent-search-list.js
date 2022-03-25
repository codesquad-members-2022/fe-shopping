import SearchList from "../search-list.js";

export default class RecentSearchList extends SearchList {
    constructor(view, store) {
        super(view, store);

        this.setEventHandler();
    }

    setEventHandler() {
        this.view.clearRecentSearchList = this.clearRecentSearchList.bind(this);
        this.view.recordBtnClickEventHandler = this.toggleRecord.bind(this);

        this.view.initEvent();
    }

    clearRecentSearchList() {
        const isRecording = this.store.getRecordingState();

        if (isRecording) {
            this.reset();
            this.renderSearchList();
        }
    }

    addSearchWord(word) {
        const isRecording = this.store.getRecordingState();
        if (isRecording) {
            this.store.addSearchWord(word);
        }

        this.store.initCurIdx();
        this.renderSearchList();
    }

    toggleRecord() {
        const isRecording = this.store.getRecordingState();
        this.view.toggleRecord(isRecording);

        this.store.toggleRecordingState();
    }

    renderSearchList() {
        const searchItems = this.store.getSearchItems();
        this.view.renderSearchList(searchItems);
        this.focusItem();
    }
}
