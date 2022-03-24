import {RelativeSearchModel} from '../model/relativeSearchModel.js';
import {RelativeSearchView} from '../view/relativeSearchView.js';
import {debounce} from '../util/util.js';

export class RelativeSearchController {
  constructor(data) {
    this.relativeSearchModel = new RelativeSearchModel(data);
    this.relativeSearchView = new RelativeSearchView();
    this.$input = document.querySelector('.search-bar-input');
    this.$popupKeywords = document.querySelector('.popup-keywords');
  }

  addInputKeyUpEvent() {
    const delayTime = 500;
    this.$input.addEventListener('keyup', debounce((event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Backspace') {
        return;
      }
      const searchKeyword = event.target.value;
      if (searchKeyword !== '') {
        this.updatePopupRelativeKeyword(searchKeyword);
      }
    }, delayTime));
  }

  addInputKeyDownEvent() {
    let keywordListNumber = 0;
    this.$input.addEventListener('keydown', (event) => {
      if (this.relativeSearchModel.isEmpty()) {
        return;
      }
      const keywordListLength = this.relativeSearchModel.keywordList.length;
      if (event.key === 'ArrowDown') {
        keywordListNumber++;
        if (keywordListNumber > keywordListLength) {
          keywordListNumber = 1;
        }
      } else if (event.key === 'ArrowUp') {
        keywordListNumber--;
        if (keywordListNumber < 1) {
          keywordListNumber = keywordListLength;
        }
      }
      const $relativeKeywordList = document.querySelector(`.relative-keyword-list`);
      const $selectedKeyword = $relativeKeywordList.querySelector(`li:nth-child(${keywordListNumber})`);
      if (!$selectedKeyword) {
        return;
      }
      event.target.value = $selectedKeyword.innerText;
    });
  }

  updatePopupRelativeKeyword(searchKeyword) {
    this.$popupKeywords.innerHTML = '';
    this.$popupKeywords.classList.remove('hidden');
    const keywordList = this.relativeSearchModel.updateKeywordList(searchKeyword);
    if (keywordList.length === 0) {
        return;
      }
    this.relativeSearchView.renderRelativeSearch(keywordList, searchKeyword);
  }
}