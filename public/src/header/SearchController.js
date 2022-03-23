import DelayTimer from "../util/DelayTimer.js";
import {
    addLocalData
} from "../util/localStorage.js";
import {
    fetchAutoCompletionWord
} from "../util/utils.js";

export default class SearchController {
    constructor($parent, resultList) {
        this.$parent = $parent;
        this.$target = null;
        this.resultList = resultList;
        this.fetchTimer = new DelayTimer();
        this.fetchDelay = 500;
    }

    render() {
        this.$parent.innerHTML += this.createHTML();
    }

    createHTML() {
        return /* html */ `
        <div class="search__form">
            <form class="search__form--main">
                <input type="text" class="search__form--input" placeholder="찾고 싶은 상품을 검색해보세요!">
                <input type="image" class="search__form--submit" src="resources/image/ic_search.png" alt="검색 아이콘">
            </form>
            ${this.resultList.createHTML()}
        </div>
        `
    }

    setTarget() {
        this.$target = document.querySelector('.search__form')
        this.resultList.setTarget(document.querySelector('.search__result'));
    }

    setEvents() {
        this.setTarget();
        this.setFocusEvent();
        this.setSubmitEvent();
        this.setInputEvent();
        this.resultList.setEvents();
    }

    setFocusEvent() {
        const inputTextForm = document.querySelector('.search__form');
        inputTextForm.addEventListener('focusin', this.handleFocusInEvent.bind(this));
        inputTextForm.addEventListener('focusout', this.handleFocusOutEvent.bind(this));
    }

    setSubmitEvent() {
        this.$target.addEventListener('submit', this.handleSubmitEvent.bind(this));
    }

    setInputEvent() {
        const inputTextForm = document.querySelector('.search__form--input');
        inputTextForm.addEventListener('input', this.handleInputEvent);
    }

    handleInputEvent = (event) => {
        const inputValue = event.target.value;

        if (!this.resultList.isTyping) {
            this.resultList.toggleContents();
        }

        if (inputValue === '') {
            this.resultList.toggleContents();
        }

        this.resultList.open();
        this.fetchTimer.debounceTimer(this.fetchDelay, () => this.fetchInputValue(inputValue));
    }

    fetchInputValue = async (inputValue) => {
        const fetchedData = await fetchAutoCompletionWord(inputValue);
        this.resultList.updateData('complete', {
            inputValue: inputValue,
            words: fetchedData
        });

        if (!fetchedData === '') {
            this.resultList.close();
        } else {
            this.resultList.open();
        }
    }

    handleFocusInEvent(event) {
        this.resultList.open();
    }

    handleFocusOutEvent(event) {
        if (event.relatedTarget !== null) {
            return;
        }

        if (event.target.value === '' && this.resultList.isTyping) {
            this.resultList.toggleContents();
        }

        this.resultList.close();
    }

    handleSubmitEvent(event) {
        event.preventDefault();
        const $textInput = document.querySelector('.search__form--input');
        const inputText = $textInput.value;

        if (inputText === '') return;

        $textInput.value = '';
        addLocalData('recent', [inputText]);
        this.resultList.updateData('recent');
        this.resultList.toggleContents();
    }
}