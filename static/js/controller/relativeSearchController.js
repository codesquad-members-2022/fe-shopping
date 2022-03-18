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

  addInputKeyUpEvent () {
    const delayTime = 500;
    this.$input.addEventListener('keyup', debounce(({target}) => {
      const searchKeyword = target.value;
      if (searchKeyword === '') return;
      const keywordList = this.relativeSearchModel.createKeywordList(searchKeyword);
      console.log(keywordList);
      }, delayTime));
  }
}