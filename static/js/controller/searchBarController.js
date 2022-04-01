import {RecentSearchModel} from '../model/recentSearchModel.js';
import {RecentSearchView} from '../view/recentSearchView.js';
import {SearchBarView} from '../view/searchBarView.js';
import {RelativeSearchModel} from '../model/relativeSearchModel.js';
import {RelativeSearchView} from '../view/relativeSearchView.js';

export class SearchBarController {
  constructor(goodsKeywordData) {
    this.recentSearchModel = new RecentSearchModel(window.sessionStorage);
    this.recentSearchView = new RecentSearchView();
    this.relativeSearchModel = new RelativeSearchModel();
    this.relativeSearchView = new RelativeSearchView();
    this.searchBarView = new SearchBarView();
    this.goodsKeywordData = goodsKeywordData;
    this.keywordListNumber = 0;
  }

  init() {
    this.relativeSearchModel.setData(this.goodsKeywordData);
    this.recentSearchModel.setState();
    this.bindViewMethod();
    this.attachEventListener();
  }

  bindViewMethod() {
    this.searchBarView.handleInputFocusEvent = this.handleInputFocusEvent.bind(this);
    this.searchBarView.handleInputKeyDownEvent = this.handleInputKeyDownEvent.bind(this);
    this.searchBarView.handleInputKeyUpEvent = this.handleInputKeyUpEvent.bind(this);
    this.searchBarView.handlePopupKeywordsClickEvent = this.handlePopupKeywordsClickEvent.bind(this);
  }

  attachEventListener() {
    this.searchBarView.addInputEvent();
    this.searchBarView.addPopupKeywordsEvent();
  }
  
  handleInputFocusEvent() {
    if (!this.recentSearchModel.isEmpty()) {
      this.searchBarView.hidePopupKeywords();
    }
    const keywordList = this.recentSearchModel.keywordList;
    this.recentSearchView.renderRecentSearch(keywordList);
  }

  handleInputKeyDownEvent(event) {
    const keywordListLength = this.relativeSearchModel.keywordList.length;
    switch(event.key) {
      case 'Enter':
        this.recentSearchModel.addKeyword(event.target.value);
        event.target.value = '';
        break;
      case 'ArrowDown':
        this.keywordListNumber++;
        if (this.keywordListNumber > keywordListLength) {
          this.keywordListNumber = 1;
        }
        const nextKeywordListText = this.relativeSearchView.getKeywordListText(this.keywordListNumber);
        event.target.value = nextKeywordListText;
        break;
      case 'ArrowUp':
        this.keywordListNumber--;
        if (this.keywordListNumber < 1) {
          this.keywordListNumber = keywordListLength;
        }
        const prevKeywordListText = this.relativeSearchView.getKeywordListText(this.keywordListNumber);
        event.target.value = prevKeywordListText;
        break;
    }
  }

  handleInputKeyUpEvent(event) {
    const delayTime = 1000;
    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(this.findRelativeKeywords.bind(this), delayTime, event);
  }

  findRelativeKeywords({key, target}) {
    if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Backspace') {
      return;
    }
    const searchKeyword = target.value;
    if (searchKeyword !== '') {
      this.keywordListNumber = 0;
      this.updatePopupKeyword(searchKeyword);
    }
  }

  handlePopupKeywordsClickEvent({target}) {
    const $recentKeyword = target.closest('li');
    if ($recentKeyword) {
      const $keywordSpan = $recentKeyword.querySelector('span');
      const selectedKeyword = $keywordSpan.innerText;
      this.recentSearchModel.deleteKeyword(selectedKeyword);
      const keywordList = this.recentSearchModel.keywordList;
      this.recentSearchView.renderRecentSearch(keywordList);
    }
  }

  updatePopupKeyword(searchKeyword) {
    this.searchBarView.emptyPopupKeywords();
    this.searchBarView.hidePopupKeywords();
    const keywordList = this.relativeSearchModel.updateKeywordList(searchKeyword);
    this.relativeSearchView.renderRelativeSearch(keywordList, searchKeyword);
  }
}
