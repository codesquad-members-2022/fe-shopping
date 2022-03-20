
import {renderHistoryList, renderPrefixList} from "./headerRender.js";

export class SearchController {
    constructor(historyManager) {
        this.$searchBox = document.querySelector('.header__form__search')
        this.$prefixList = document.querySelector('.header__search__prefix-container')
        this.$historyList = document.querySelector('.header__search__history-container')
        this.$searchForm = document.querySelector('.header__form')
        this.timer = null
        this.prefixListState = false
        this.prefixListElements = []
        this.prefixListIndex = null
        this.keydownState = false
        this.originInputValue = null
        this.historyManager = historyManager
        this.historyState = true
    }

    initSearchController() {
        this.setSearchBoxEvent()
        this.setPrefixListEvent()
        this.setSearchFormEvent()
        this.setHistoryListEvent()
    }

    setSearchBoxEvent() {
        this.$searchBox.addEventListener('input', (e) => this.searchInputHandler(e))
        this.$searchBox.addEventListener('click', (e) => this.searchClickHandler(e))
        this.$searchBox.addEventListener('focusout', (e) => this.searchFocusoutHandler(e))
        this.$searchBox.addEventListener('keydown', (e) => this.searchKeydownHandler(e))
    }

    setPrefixListEvent() {
        this.$prefixList.addEventListener('mouseover', (e) => this.prefixListMouseoverHandler(e))
    }

    setHistoryListEvent() {
        this.$historyList.addEventListener('click', (e) => this.historyListClickHandler(e))
    }

    setSearchFormEvent() {
        this.$searchForm.addEventListener('submit', (e) => this.formSubmitHandler(e))
    }

    historyListClickHandler(e) {
        e.stopPropagation()

        this.toggleHistoryList(e)

        if(this.historyState){
            this.deleteHistoryList(e)
            this.deleteAllHistoryList(e)
        }
    }

    deleteHistoryList(e) {
        if(e.target.className !== 'history-delete') return
        const historyElem = e.target.closest('li')
        const historyWord = historyElem.firstElementChild.innerText
        this.historyManager.deleteItem(historyWord)
        this.onHistoryList()
        // 삭제 버튼 클릭 시 포커스 대상이 사라져서 그런가? 어딜 눌러도 포커스아웃이 안되는 현상이 발생하여 억지로 포커스를 인풋에 줌.
        document.querySelector('.search-input').focus()
    }

    deleteAllHistoryList(e) {
        if(e.target.className !== 'history-deleteAll') return
        this.historyManager.clearItem()
        this.onHistoryList()
    }

    toggleHistoryList(e) {
        if(e.target.className !== 'history-switch') return
        const $historySwitch = document.querySelector('.history-switch')
        const $historyListOuter = document.querySelector('.history-list')

        if(this.historyState) {
            this.historyState = false
            $historySwitch.innerText = '최근검색어켜기'
            this.offHistoryList()
        }
        else {
            this.historyState = true
            $historySwitch.innerText = '최근검색어끄기'
            this.onHistoryList()
        }
    }

    historyListFocusoutHandler(e) {
        this.addVisibilityHidden(this.$historyList)
    }

    prefixListMouseoverHandler(e) {
        if(e.target.tagName === 'LI') {
            this.prefixListIndex = Number(e.target.dataset.index)
            this.removeKeyOn()
            this.addKeyOn(this.prefixListIndex)
        }
    }

    formSubmitHandler(e) {
        e.preventDefault()

        if(!this.originInputValue || this.originInputValue.length === 0) return
        this.setOriginState()
        this.historyManager.addItem(this.originInputValue)
    }

    searchKeydownHandler(e) {
        if(e.key === 'ArrowDown' && this.prefixListState) {
            this.keydownState = true
            this.downPrefixList(e)
        }
        else if(e.key === 'ArrowUp' && this.prefixListState) {
            this.keydownState = true
            this.upPrefixList(e)
        }
        else {
            this.prefixListIndex = null
            this.keydownState = false
        }
    }

    searchInputHandler(e) {
        if(this.keydownState) return

        const inputWord = e.target.value
        this.autoComplete(inputWord)

        if(inputWord.length === 0) {
            this.removeVisibilityHidden(this.$historyList)
        }
    }

    searchFocusoutHandler(e) {
        const focusBtnClass = ['history-delete', 'history-switch', 'history-deleteAll']
        if(e.relatedTarget !== null && focusBtnClass.includes(e.relatedTarget.className)) return

        this.addVisibilityHidden(this.$prefixList)
        this.addVisibilityHidden(this.$historyList)

        if(e.target.value.length === 0)
        this.prefixListIndex = null
    }

    searchClickHandler(e){
        if(e.target.className === 'search-btn') return
        if(this.historyState && e.target.value.length === 0) {
            return this.onHistoryList()
        }
        if(!this.historyState && e.target.value.length === 0) {
            return this.offHistoryList()
        }
        if(this.prefixListElements.length === 0) return;
        this.removeVisibilityHidden(this.$prefixList)
    }

    onHistoryList() {
        const historyStorage = this.historyManager.getStorage()
        this.openHistoryList([...historyStorage])
    }

    offHistoryList() {
        this.openHistoryList('off')
    }
    openHistoryList(historyList) {
        const $historyListOuter = document.querySelector('.history-list')
        renderHistoryList($historyListOuter, historyList)
        this.removeVisibilityHidden(this.$historyList)
    }

    setOriginState() {
        clearTimeout(this.timer)
        const $input = document.querySelector('.search-input')
        $input.value = ''
        this.addVisibilityHidden(this.$prefixList)
        this.addVisibilityHidden(this.$historyList)
    }

    setPrefixListElements() {
        this.prefixListElements = [...this.$prefixList.children]
    }

    setBeforeKeydownState(e) {
        e.target.value = this.originInputValue
        this.keydownState = false
        this.prefixListIndex = null
        this.removeKeyOn()
    }

    autoComplete(inputWord) {
        this.originInputValue = inputWord
        this.addVisibilityHidden(this.$historyList)
        this.prefixListState = false
        this.searchPrefixList(inputWord)
    }

    upPrefixList(e) {
        if(this.prefixListIndex === null) {
            this.prefixListIndex = this.prefixListElements.length
        }
        this.prefixListIndex -= 1
        if(this.prefixListIndex < 0) {
           return this.setBeforeKeydownState(e)
        }
        this.onKeyDownEffect(e, this.prefixListIndex)
    }

    downPrefixList(e) {
        if(this.prefixListIndex === null) {
            this.prefixListIndex = -1
        }
        this.prefixListIndex += 1
        if(this.prefixListIndex > this.prefixListElements.length - 1) {
            return this.setBeforeKeydownState(e)
        }
        this.onKeyDownEffect(e, this.prefixListIndex)
    }

    onKeyDownEffect(e, index) {
        this.removeKeyOn()
        this.addKeyOn(index)
        this.changeInputValue(e, index)
    }

    changeInputValue(e, index) {
        const targetElement = this.prefixListElements[index]
        e.target.value = targetElement.innerText
    }

    addKeyOn(index) {
        const targetElement = this.prefixListElements[index]
        targetElement.classList.add('key-on')
    }

    removeKeyOn() {
        this.prefixListElements.forEach(element => {
            if(element.classList.contains('key-on')){
                element.classList.remove('key-on')
            }
        })
    }

    addVisibilityHidden(target) {
        target.classList.add('visibility-hidden')
    }

    removeVisibilityHidden(target) {
        target.classList.remove('visibility-hidden')
    }

    searchPrefixList(word) {
        const highlightLength = word.trim().length
        this.fetchPrefixList(word)
            .then((prefixArr) => this.openPrefixList(prefixArr, highlightLength))
    }

    openPrefixList(prefixArr, highlightLength) {
        prefixArr.length === 0? this.addVisibilityHidden(this.$prefixList) : this.removeVisibilityHidden(this.$prefixList);
        this.highlightPrefixList(prefixArr, highlightLength)
        this.setPrefixListElements()
        this.prefixListState = true
    }

    highlightPrefixList(prefixList, highlightLength) {
        const splitPrefixArr = prefixList.map((fullWord) => [fullWord.slice(0, highlightLength), fullWord.slice(highlightLength)] )
        renderPrefixList(this.$prefixList, splitPrefixArr)
    }

    fetchPrefixList(word) {
        if(this.timer) {
            clearTimeout(this.timer)
        }
        return this.delay(500).then(() => this.fetchPrefixListArray(word))
    }

    delay(ms) {
        return new Promise((res) => {
            return this.timer = setTimeout(() => res(), ms);
        });
    }

    fetchPrefixListArray(word) {
        return fetch(`https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${word}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`)
            .then((res) => res.json())
            .then((prefixData) => prefixData.suggestions.map((v) => v.value))
    }
}
