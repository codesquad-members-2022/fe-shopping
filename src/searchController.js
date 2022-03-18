import { createStrongList } from "./templates.js";
import { renderFormSearchList } from "./render.js";

export class SearchController {
    constructor() {
        this.$input = document.querySelector('.header__form__search')
        this.$searchList = document.querySelector('.header__search__list')
        this.timer = null
        this.state = null
        this.prefixListElements = null
        this.prefixListIndex = null
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

    setState(state) {
        this.state = state
    }

    searchListMouseoverHandler(e) {
        if(e.target.tagName === 'LI') {
            this.prefixListIndex = Number(e.target.dataset.index)
            this.removeKeyOn()
            this.addKeyOn(this.prefixListIndex)
        }
    }

    setPrefixListElements() {
        const $headerSearchList = document.querySelector('.header__search__list')
        this.prefixListElements = [...$headerSearchList.children]
    }

    searchKeydownHandler(e) {
        if(!this.state) return
        if(e.key === 'ArrowDown') {
            this.downPrefixList()
        }
        else if(e.key === 'ArrowUp') {
            this.upPrefixList()
        }
        else {
            this.prefixListIndex = null
        }
    }

    upPrefixList() {
        if(this.prefixListIndex === null) {
            this.prefixListIndex = this.prefixListElements.length
        }
        this.prefixListIndex -= 1
        if(this.prefixListIndex < 0) {
            this.prefixListIndex = this.prefixListElements.length - 1
        }

        this.removeKeyOn()
        this.addKeyOn(this.prefixListIndex)
    }

    downPrefixList() {
        if(this.prefixListIndex === null) {
            this.prefixListIndex = -1
        }
        this.prefixListIndex += 1
        if(this.prefixListIndex > this.prefixListElements.length - 1) {
            this.prefixListIndex = 0
        }

        this.removeKeyOn()
        this.addKeyOn(this.prefixListIndex)
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
        this.setState(false)
        this.addVisibilityHidden()
    }

    addVisibilityHidden() {
        this.$searchList.classList.add('visibility-hidden')
    }

    searchClickHandler(e) {
        this.setState(true)
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
        this.setState(true)
        const inputWord = e.target.value
        if(inputWord.length > 0) {
            this.searchPrefixLists(inputWord)
            this.removeVisibilityHidden()
        }
        else this.addVisibilityHidden()
    }

    searchPrefixLists(word) {
        const highlightLength = word.trim().length
        this.fetchPrefixList(word)
            .then((prefixArr) => {
                if(prefixArr.length === 0) return this.addVisibilityHidden()

                this.highlightPrefixList(prefixArr, highlightLength)
                this.setPrefixListElements()
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
