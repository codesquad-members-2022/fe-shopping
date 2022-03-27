import { SearchInputView } from '../views/search/SearchInputView.js';
import { SearchResultView } from '../views/search/SearchResultView.js';
import { SearchInputModel } from '../models/SearchInputModel.js';
import { $$, debounce, fetchGetData } from '../../utils/util.js';
import { autoCompleteDelay, ENTER, KEY_ARROW_UP, KEY_ARROW_DOWN } from '../constants/constant.js';
import { SearchKeyWord } from '../../components/search/SearchKeyWord.js';

export class SearchInputController {
  constructor() {
    this.SearchInputView = new SearchInputView();
    this.SearchResultView = new SearchResultView();

    this.SearchInputView.keywordDataHandler = this.keywordDataHandler.bind(this);
    this.SearchInputView.keyUpDataHandler = this.keyUpDataHandler.bind(this);
    this.SearchInputView.keyPressDataHandler = this.keyPressDataHandler.bind(this);

    this.SearchInputModel = new SearchInputModel();
    this.SearchInputView.run();
  }

  keywordDataHandler() {
    return debounce(async args => {
      const value = args.target.value;

      if (this.SearchInputModel.getTurn()) {
        this.SearchInputModel.turnOff();
      }

      this.SearchResultView.clearView();

      if (value) {
        // 만약 이미 한 번 요청한 데이터 일시엔? 또 fetch를 보낼 필요가 없도록 수정 필요
        const responseData = await fetchGetData('search', value);
        this.SearchInputModel.setCurrentWord(value);
        this.SearchInputModel.setResultViewData(responseData);

        this.SearchResultView.searchResultElement.insertAdjacentHTML(
          'beforeend',
          SearchKeyWord(
            value,
            responseData.map(element => element.keyword)
          )
        );
      } else {
        // 검색어가 입력이 없다면 ?
        this.SearchInputModel.getRecentWords()
          ? this.SearchResultView.showRecentView(this.SearchInputModel.getRecentWords(), true)
          : '';
      }
    }, autoCompleteDelay);
  }

  toggleElementClass = (elements, className) => {
    elements.forEach(target => {
      parseInt(target.getAttribute('data-id')) === this.SearchInputModel.position
        ? target.classList.remove(className)
        : target.classList.add(className);
    });
  };

  keyUpDataHandler({ key }) {
    const resultViewData = this.SearchInputModel.getResultViewData().length;
    if (key === KEY_ARROW_UP) {
      this.SearchInputModel.minusPosition();
      if (this.SearchInputModel.position < 0) this.SearchInputModel.setPosition(resultViewData - 1);
    }
    if (key === KEY_ARROW_DOWN) {
      this.SearchInputModel.addPosition();
      if (this.SearchInputModel.position >= resultViewData) this.SearchInputModel.setPosition(0);
    }

    this.toggleElementClass($$('.search--link'), 'text-none');
  }

  keyPressDataHandler({ key }) {
    if (key === ENTER) {
      this.SearchInputModel.getCurrentWord()
        ? this.SearchInputModel.pushRecentWords()
        : alert('This data is not Exist.');
      this.SearchInputModel.setCurrentWord('');
      this.SearchInputView.searchInputElement.value = '';
      this.SearchResultView.searchResultElement.innerHTML = '';
    }
  }
}
