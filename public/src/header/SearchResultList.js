import Toggler from "../components/Toggler.js";
import {
    getLocalData
} from "../util/localStorage.js";

export default class SearchResultList extends Toggler {
    constructor() {
        super();
        this.listData = null;
        this.isTyping = false;
        this.recentKeywords = getLocalData()['recent'] || [];
        this.autoCompletionWords = {
            inputValue: '',
            words: []
        };
    }

    createHTML() {
        return /* html */ `
            <div class="search__result none">
                <strong class="search__result--title">최근 검색어</strong>
                <ul class="search__result--list">
                    ${this.recentKeywords.reduce((text, keyword) => text += `<li class="search__result--item">${keyword}</li>`, '')}
                </ul>
                <div class="search__button">
                    <button class="search__button--remove">전체 삭제</button>
                    <button class="search__button--off">최근검색어끄기</button>
                </div>
            </div>
        `;
    }

    toggleState() {
        const recentTitle = document.querySelector('.search__result--title');
        const recentButtons = document.querySelector('.search__button');
        recentTitle.classList.toggle('none');
        recentButtons.classList.toggle('none');
        this.isTyping = !this.isTyping;
        this.setListData();
    }

    updateData(type, data) {
        if (type === 'recent') {
            this.recentKeywords = getLocalData()[type];
            return;
        }

        this.autoCompletionWords = data;
        this.setListData();
    }

    setListData() {
        const searchList = document.querySelector('.search__result--list');
        const changedDate = this.isTyping ? this.autoCompletionWords.words : this.recentKeywords;
        const replaceText = this.isTyping ? this.autoCompletionWords.inputValue : '';
        searchList.innerHTML = changedDate.reduce((text, data) => text += this.createListItemHTML(data, replaceText), '');
    }

    createListItemHTML(text, replaceText = '') {
        if (replaceText !== '') {
            text = text.replace(new RegExp(replaceText, 'i'), `<strong>${replaceText}</strong>`);
        }

        const itemHTML = `<li class="search__result--item">${text}</li>`;
        return itemHTML;
    }
}