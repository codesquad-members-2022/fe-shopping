import HtmlElement from '../../../../utils/HtmlElement.js';
import AutoComplete from './AutoComplete/index.js';
import HistoryList from './History/index.js';
import ScopeSelector from './ScopeSelector/index.js';
import { myLocalStorage } from '../../../../utils/mockDB.js';
import { POP_UP, SEARCH_BOX } from '../../../../constant.js';
import {
  handleSubmit,
  handleInputClick,
  handleInputKeyDown,
  handleInput,
  changeSearchOption,
} from './eventHandler.js';
import { setInheritance } from '../../../../utils/manuplateDOM.js';

const {
  INPUT_DEFAULT,
  HISTORY: { HISTORY_LOCAL_STORAGE_KEY },
} = SEARCH_BOX;

export default function SearchBox($element) {
  HtmlElement.call(this, $element);
}

setInheritance({ parent: HtmlElement, child: SearchBox });

SearchBox.prototype.init = function () {
  this.state = {
    activeHistory: INPUT_DEFAULT,
    activeAutoTerm: INPUT_DEFAULT,
    showHistroy: true,
    option: '전체',
    inputValue: '',
    histroyList: myLocalStorage.get(HISTORY_LOCAL_STORAGE_KEY) || [],
    autoSearchList: [],
  };
};

SearchBox.prototype.setTemplate = function () {
  return template;
};

SearchBox.prototype.renderChild = function () {
  const {
    option,
    histroyList,
    autoSearchList,
    inputValue,
    activeAutoTerm,
    activeHistory,
  } = this.state;
  const $scopeSelector = this.$element.querySelector('.search__selector');
  const $searchRecord = this.$element.querySelector('.search__record');
  const $searchAuto = this.$element.querySelector('.search__auto');
  this.$ScopeSelector = new ScopeSelector($scopeSelector, {
    option,
    changeSearchOption: changeSearchOption.bind(this),
  });
  this.$HistoryList = new HistoryList($searchRecord, {
    option,
    histroyList,
    activeHistory,
  });
  this.$AutoComplete = new AutoComplete($searchAuto, {
    autoSearchList,
    inputValue,
    activeAutoTerm,
  });
};

SearchBox.prototype.setEvent = function () {
  this.$form = this.$element.querySelector('#searhForm');
  this.$input = this.$element.querySelector('#searchInput');
  this.$form.addEventListener('submit', handleSubmit.bind(this));
  this.$input.addEventListener('click', handleInputClick.bind(this));
  this.$input.addEventListener('keydown', handleInputKeyDown.bind(this));
  this.$input.addEventListener('input', handleInput.bind(this));
};

SearchBox.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
  //값이 바뀔 때마다 자식 전체를 리렌더링하지 않고 바뀐 값을 쓰는 자식만 리렌더링하기
  // this.renderChild();
};

const template = ` <div class="search__selector pop-up-container"></div>
<div class="search__container">
<form class="search__form" id="searhForm">
<input
class="pop-up-container"
  id="searchInput"
  type="text"
  placeholder="찾고 싶은 상품을 검색해보세요!"
  autocomplete="off"
/>
<div>
  <span><i class="fas fa-microphone"></i></span>
  <span><i class="fas fa-search"></i></span>
</div>
</form>
<div class="search__auto ${POP_UP.hidden}" id="searchAuto"></div>
<div class="search__record ${POP_UP.hidden}" id="searchRecord"></div>
</div>
`;
