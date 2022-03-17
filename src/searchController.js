import { createStrongLists } from "./templates.js";
import { renderFormSearchLists } from "./render.js";

export class SearchController {
    constructor() {
        this.$input = document.querySelector('.header__form__search')
        this.$searchList = document.querySelector('.header__search__list')
        this.timer = null
    }

    initSearchController() {
        this.setEvent()
    }

    setEvent() {
        this.$input.addEventListener('input', (e) => this.searchInputHandler(e))
        this.$input.addEventListener('focusout', (e) => this.searchFocusoutHandler(e))
    }

    searchFocusoutHandler(e) {
        this.addVisibilityHidden()
    }

    addVisibilityHidden() {
        this.$searchList.classList.add('visibility-hidden')
    }

    searchFocusHandler(e) {
        this.removeVisibilityHidden()
    }

    searchInputHandler(e) {
        const inputWord = e.target.value
        if(inputWord.length > 0) {
            this.showPrefixLists(inputWord)
            this.removeVisibilityHidden()
        }
        else this.addVisibilityHidden()
    }

    showPrefixLists(word) {
        const highlightLength = word.length
        this.fetchPrefixLists(word)
            .then((prefixArr) => {
                console.log(prefixArr)
                const splitPrefixArr = prefixArr.map((fullWord) => [fullWord.slice(0, highlightLength), fullWord.slice(highlightLength)] )
                const searchListsTemplate = createStrongLists(splitPrefixArr)
                renderFormSearchLists(searchListsTemplate)
            })
    }

    fetchPrefixLists(word) {
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
