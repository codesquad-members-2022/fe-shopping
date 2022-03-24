import { SearchList } from "./search-list.js";

class RecentSearchList extends SearchList {
    RECORD_ON = "최근검색어켜기";
    RECORD_OFF = "최근검색어끄기";

    recordOnBlock = document.querySelector(".record-on");
    recordOffBlock = document.querySelector(".record-off");
    recordButton = document.querySelector(".record-btn");

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

        this.renderSearchList();
    }

    showRecordBlock(recordBlock) {
        recordBlock.style.display = "block";
    }

    hideRecordBlock(recordBlock) {
        recordBlock.style.display = "none";
    }

    toggleRecord() {
        if (this.isRecording) {
            this.hideRecordBlock(this.recordOnBlock);
            this.showRecordBlock(this.recordOffBlock);
            this.recordButton.innerText = this.RECORD_ON;
        } else {
            this.showRecordBlock(this.recordOnBlock);
            this.hideRecordBlock(this.recordOffBlock);
            this.recordButton.innerText = this.RECORD_OFF;
        }

        this.isRecording = !this.isRecording;
    }

    getSearchListItem(itemName, idx) {
        return `<li 
                    class="search__list--item grid" 
                    data-idx="${idx}" 
                    data-name="${itemName}">
                        <p class="search__list--item-text">${itemName}</p>
                        <p class="delete-btn">삭제</p>
                </li>`;
    }

    renderSearchList() {
        const searchList = this.searchItems.reduce(
            (acc, itemName, idx) => acc + this.getSearchListItem(itemName, idx),
            ""
        );
        this.listContainer.innerHTML = searchList;
        this.focusItem();
    }
}

export { RecentSearchList };
