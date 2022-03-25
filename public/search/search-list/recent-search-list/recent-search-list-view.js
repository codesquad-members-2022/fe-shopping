import SearchListView from "../search-list-view.js";

export default class RecentSearchListView extends SearchListView {
    constructor(searchList, listContainer) {
        super(searchList, listContainer);

        this.recordOnBlock = document.querySelector(".record-on");
        this.recordOffBlock = document.querySelector(".record-off");
        this.recordBtn = document.querySelector(".record-btn");

        this.RECORD_ON = "최근검색어켜기";
        this.RECORD_OFF = "최근검색어끄기";
    }

    initEvent() {
        const clearAllText = document.querySelector(".clear-all");
        clearAllText.addEventListener("click", this.clearRecentSearchList);

        this.recordBtn.addEventListener(
            "click",
            this.recordBtnClickEventHandler
        );

        this.listContainer.addEventListener(
            "click",
            this.recentSearchListClickEventHandler
        );
    }

    showRecordBlock(recordBlock) {
        recordBlock.style.display = "block";
    }

    hideRecordBlock(recordBlock) {
        recordBlock.style.display = "none";
    }

    changeRecordBtnText(recordingState) {
        this.recordBtn.textContent = recordingState;
    }

    toggleRecord(isRecording) {
        if (isRecording) {
            this.hideRecordBlock(this.recordOnBlock);
            this.showRecordBlock(this.recordOffBlock);
            this.changeRecordBtnText(this.RECORD_ON);
        } else {
            this.showRecordBlock(this.recordOnBlock);
            this.hideRecordBlock(this.recordOffBlock);
            this.changeRecordBtnText(this.RECORD_OFF);
        }
    }

    getSearchListItemTemplate(itemName, idx) {
        return `<li 
                    class="search__list--item grid" 
                    data-idx="${idx}" 
                    data-name="${itemName}">
                        <p class="search__list--item-text">${itemName}</p>
                        <p class="delete-btn">삭제</p>
                </li>`;
    }

    renderSearchList(searchItems) {
        const searchList = searchItems.reduce(
            (acc, itemName, idx) =>
                acc + this.getSearchListItemTemplate(itemName, idx),
            ""
        );
        this.listContainer.innerHTML = searchList;
    }
}
