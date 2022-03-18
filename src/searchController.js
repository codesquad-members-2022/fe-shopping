import { createStrongList } from "./templates.js";
import { renderFormSearchList } from "./render.js";

export class SearchController {
    constructor() {
        this.$input = document.querySelector('.header__form__search')
        this.$searchList = document.querySelector('.header__search__list')
        this.timer = null
        this.prefixListState = false
        this.prefixListElements = null
        this.prefixListIndex = null
        this.keydownState = false
        this.originInputValue = null
    }

    initSearchController() {
        this.setSearchBoxEvent()
        this.setSearchListEvent()
    }

    setSearchBoxEvent() {
        this.$input.addEventListener('input', (e) => this.searchInputHandler(e))
        this.$input.addEventListener('click', (e) => this.searchClickHandler(e))
        this.$input.addEventListener('focusout', (e) => this.searchFocusoutHandler(e))
        this.$input.addEventListener('keydown', (e) => this.searchKeydownHandler(e))
    }

    setSearchListEvent() {
        this.$searchList.addEventListener('mouseover', (e) => this.searchListMouseoverHandler(e))
    }

    searchListMouseoverHandler(e) {
        if(e.target.tagName === 'LI') {
            this.prefixListIndex = Number(e.target.dataset.index)
            this.removeKeyOn()
            this.addKeyOn(this.prefixListIndex)
        }
    }

    setPrefixListElements() {
        this.prefixListElements = [...this.$searchList.children]
    }

    searchKeydownHandler(e) {
        if(!this.prefixListState) return;
        if(e.key === 'ArrowDown') {
            this.keydownState = true
            this.downPrefixList(e)
        }
        else if(e.key === 'ArrowUp') {
            this.keydownState = true
            this.upPrefixList(e)
        }
        else {
            this.prefixListIndex = null
        }
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

    setOriginInputState(e) {
        e.target.value = this.originInputValue
        this.keydownState = false
        this.prefixListIndex = null
        this.removeKeyOn()
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

    searchFocusoutHandler(e) {
        this.addVisibilityHidden()
        this.prefixListIndex = null
    }

    addVisibilityHidden() {
        this.$searchList.classList.add('visibility-hidden')
    }

    searchClickHandler(e){
        this.reRenderPrefixList()
    }

    reRenderPrefixList() {
        if(!this.prefixListElements) return;
        const searchListsTemplate = this.prefixListElements.reduce((acc, cur) => {
            return acc + cur.outerHTML}, ``)
        renderFormSearchList(searchListsTemplate)
        this.removeVisibilityHidden()
        this.setPrefixListElements()
    }

    searchInputHandler(e) {
        const inputWord = e.target.value
        if(inputWord.length >= 0) {
            this.searchPrefixLists(inputWord)
        }
        else this.addVisibilityHidden()
    }

    searchPrefixLists(word) {
        if(this.keydownState) return
        const highlightLength = word.trim().length
        this.fetchPrefixList(word)
            .then((prefixArr) => {
                if(prefixArr.length === 0) {
                    this.prefixListElements = null
                    this.addVisibilityHidden()
                    return
                }

                this.highlightPrefixList(prefixArr, highlightLength)
                this.setPrefixListElements()
                this.removeVisibilityHidden()
                this.prefixListState = true
                this.originInputValue = word
            })
    }

    highlightPrefixList(prefixList, highlightLength) {
        const splitPrefixArr = prefixList.map((fullWord) => [fullWord.slice(0, highlightLength), fullWord.slice(highlightLength)] )
        const searchListsTemplate = createStrongList(splitPrefixArr)
        renderFormSearchList(searchListsTemplate)
    }

    fetchPrefixList(word) {
        if(this.timer) {
            clearTimeout(this.timer)
            this.prefixListState = false
            this.originInputValue = null
        }
        return this.delay(500)
            .then(() => fetch(
                    `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${word}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`
                ))
            .then((res) => res.json())
            .then((data) => data.suggestions.map((v) => v.value))
    }

    removeVisibilityHidden(e) {
        this.$searchList.classList.remove('visibility-hidden')
    }

    delay(ms) {
        return new Promise((res) => {
            return this.timer = setTimeout(() => res(), ms);
        });
    }
}
