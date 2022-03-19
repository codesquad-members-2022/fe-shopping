import { createStrongList } from "./templates.js";
import { renderPrefixList } from "./render.js";

export class SearchController {
    constructor() {
        this.$searchBox = document.querySelector('.header__form__search')
        this.$prefixList = document.querySelector('.header__search__prefix-container')
        this.$historyList = document.querySelector('.header__search__history-container')
        this.timer = null
        this.prefixListState = false
        this.prefixListElements = null
        this.prefixListIndex = null
        this.keydownState = false
        this.originInputValue = null
        this.historyListState = false
    }

    initSearchController() {
        this.setSearchBoxEvent()
        this.setPrefixListEvent()
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

    prefixListMouseoverHandler(e) {
        if(e.target.tagName === 'LI') {
            this.prefixListIndex = Number(e.target.dataset.index)
            this.removeKeyOn()
            this.addKeyOn(this.prefixListIndex)
        }
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
        if(inputWord.length === 0) return this.removeVisibilityHidden(this.$historyList)

        this.addVisibilityHidden(this.$historyList)
        this.prefixListState = false
        this.historyListState = false
        this.originInputValue = inputWord
        this.searchPrefixList(inputWord)
    }

    searchFocusoutHandler(e) {
        this.addVisibilityHidden(this.$prefixList)
        this.addVisibilityHidden(this.$historyList)
        if(e.target.value.length !== 0) return
        this.prefixListIndex = null
    }

    searchClickHandler(e){
        if(e.target.value.length === 0) {
            this.removeVisibilityHidden(this.$historyList)
            this.historyListState = true
            return
        }
        if(this.historyListState || this.prefixListElements.length === 0) return;
        this.removeVisibilityHidden(this.$prefixList)
    }

    setPrefixListElements() {
        this.prefixListElements = [...this.$prefixList.children]
    }

    setOriginInputState(e) {
        e.target.value = this.originInputValue
        this.keydownState = false
        this.prefixListIndex = null
        this.removeKeyOn()
    }

    upPrefixList(e) {
        if(this.prefixListIndex === null) {
            this.prefixListIndex = this.prefixListElements.length
        }
        this.prefixListIndex -= 1
        if(this.prefixListIndex < 0) {
           return this.setOriginInputState(e)
        }
        this.onKeyDownEffect(e, this.prefixListIndex)
    }

    downPrefixList(e) {
        if(this.prefixListIndex === null) {
            this.prefixListIndex = -1
        }
        this.prefixListIndex += 1
        if(this.prefixListIndex > this.prefixListElements.length - 1) {
            return this.setOriginInputState(e)
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

    // reRenderPrefixList() {
    //     const prefixListsTemplate = this.prefixListElements.reduce((acc, cur) => {
    //         return acc + cur.outerHTML}, ``)
    //     renderFormSearchList(prefixListsTemplate)
    //     this.removeVisibilityHidden()
    //     this.setPrefixListElements()
    // }

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
        const prefixListTemplate = createStrongList(splitPrefixArr)
        renderPrefixList(this.$prefixList, prefixListTemplate)
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
