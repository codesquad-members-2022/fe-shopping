import {RecentSearchModel} from '../model/recentSearchModel.js';
import {RecentSearchView} from '../view/recentSearchView.js';
import {SearchBarView} from '../view/searchBarView.js';
import {RelativeSearchModel} from '../model/relativeSearchModel.js';
import {RelativeSearchView} from '../view/relativeSearchView.js';
import {fetchData, debounce} from '../util/util.js';

export class SearchBarController {
  constructor() {
    this.recentSearchModel = new RecentSearchModel(window.sessionStorage);
    this.recentSearchView = new RecentSearchView();
    this.relativeSearchModel = new RelativeSearchModel();
    this.relativeSearchView = new RelativeSearchView();
    this.searchBarView = new SearchBarView();
    this.keywordListNumber = 0;
  }

  init() {
    this.setRecentSearchModelData();
    this.bindViewMethod();
    this.attachEventListener();
  }

  async setRecentSearchModelData() {
    const goodsData = await fetchData('goodsData');
    const firstKeyword = '아';
    const keywordsData = goodsData[firstKeyword];
    this.relativeSearchModel.setData(keywordsData);
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
    this.recentSearchModel.updateKeywordList();
    const keywordList = this.recentSearchModel.keywordList;
    const keywordIndexList = this.recentSearchModel.keywordIndexList;
    this.recentSearchView.renderRecentSearch(keywordList, keywordIndexList);
  }

  handleInputKeyDownEvent(event) {
    const keywordListLength = this.relativeSearchModel.keywordList.length;
    let keywordListText;
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
        keywordListText = this.relativeSearchView.getKeywordListText(this.keywordListNumber);
        event.target.value = keywordListText;
        break;
      case 'ArrowUp':
        this.keywordListNumber--;
        if (this.keywordListNumber < 1) {
          this.keywordListNumber = keywordListLength;
        }
        keywordListText = this.relativeSearchView.getKeywordListText(this.keywordListNumber);
        event.target.value = keywordListText;
        break;
    }
  }

  handleInputKeyUpEvent(event) {
    const delayTime = 500;
    (debounce((event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Backspace') {
        return;
      }
      const searchKeyword = event.target.value;
      if (searchKeyword !== '') {
        this.keywordListNumber = 0;
        this.updatePopupKeyword(searchKeyword);
      }
    }, delayTime))(event);
  }

  handlePopupKeywordsClickEvent({target}) {
    const $recentKeyword = target.closest('li');
    if ($recentKeyword) {
      const selectedKeywordIndex =  Number($recentKeyword.dataset.index);
      this.recentSearchModel.deleteKeyword(selectedKeywordIndex);
      const keywordList = this.recentSearchModel.keywordList;
      const keywordIndexList = this.recentSearchModel.keywordIndexList;
      this.recentSearchView.renderRecentSearch(keywordList, keywordIndexList);
    }
  }

  updatePopupKeyword(searchKeyword) {
    this.searchBarView.emptyPopupKeywords();
    this.searchBarView.hidePopupKeywords();
    const keywordList = this.relativeSearchModel.updateKeywordList(searchKeyword);
    this.relativeSearchView.renderRelativeSearch(keywordList, searchKeyword);
  }
}
