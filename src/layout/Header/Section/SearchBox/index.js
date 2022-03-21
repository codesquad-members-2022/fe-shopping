import AutoComplete from './AutoComplete.js';
import RecentSearchList from './RecentSearchList.js';
import Selector from './Selector.js';
import { RECENT_SEARCH_LIST } from '../../../../constant/constant.js';
import { POP_UP } from '../../../../constant/htmlSelector.js';
import { moveToSearchTermPage } from '../../../../router.js';
import HtmlElement from '../../../../utils/HtmlElement.js';
import {
  findTargetClassElement,
  findTargetIdElement,
  showPopUp,
  closePopUp,
} from '../../../../utils/manuplateDOM.js';
import {
  myLocalStorage,
  requestAutoCompleteTerms,
} from '../../../../utils/util.js';

export default function SearchBox($element) {
  HtmlElement.call(this, $element);
}
SearchBox.prototype = Object.create(HtmlElement.prototype);
SearchBox.prototype.constructor = SearchBox;

SearchBox.prototype.init = function () {
  this.state = {
    showHistroy: true,
    option: '전체',
    inputValue: '',
    recentSearchList: myLocalStorage.get(RECENT_SEARCH_LIST) || [],
    autoSearchList: [],
  };
};

SearchBox.prototype.setTemplate = function () {
  return template;
};

SearchBox.prototype.renderChild = function () {
  const { option, recentSearchList, autoSearchList } = this.state;
  const $selector = findTargetClassElement(this.$element, 'search__selector');
  const $searchRecord = findTargetClassElement(this.$element, 'search__record');
  const $searchAuto = findTargetClassElement(this.$element, 'search__auto');
  this.$Selector = new Selector($selector, {
    option,
    changeSearchOption: changeSearchOption.bind(this),
  });
  this.$RecentSearchList = new RecentSearchList($searchRecord, {
    recentSearchList,
  });
  this.$AutoComplete = new AutoComplete($searchAuto, { autoSearchList });
};

SearchBox.prototype.setEvent = function () {
  const $form = findTargetIdElement(this.$element, 'searhForm');
  const $input = findTargetIdElement($form, 'searchInput');
  this.$input = $input;
  $form.addEventListener('submit', handleSubmit.bind(this));
  $input.addEventListener('click', showRecord.bind(this));
  $input.addEventListener('input', handleInput.bind(this));
};

SearchBox.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
};

function changeSearchOption(option) {
  this.setState({ option });
  this.$Selector.setState({ option });
}

function handleRecentSearchList(recentSearchList, inputValue) {
  if (recentSearchList.length >= MAX_LOCAL_STORAGE) {
    return [inputValue, ...recentSearchList.slice(0, -1)];
  }
  return [inputValue, ...recentSearchList];
}

function handleSubmit(event) {
  event.preventDefault();
  const { option, inputValue } = this.state;
  const searchTerm = inputValue;
  const { recentSearchList } = this.$RecentSearchList.state;
  const updatedRecentSearchList = handleRecentSearchList(
    recentSearchList,
    inputValue
  );
  myLocalStorage.set(RECENT_SEARCH_LIST, updatedRecentSearchList);
  this.setState({ inputValue: '' });
  this.$RecentSearchList.setState({
    recentSearchList: updatedRecentSearchList,
  });
  this.$input.value = '';
  moveToSearchTermPage(option, searchTerm);
}

async function handleInput({ target }) {
  const { value: inputValue } = target;
  this.setState({ inputValue });
  const reponseTerms = await requestAutoCompleteTerms.requestTerms(inputValue);
  handlePopUpDisplay.call(this, inputValue, reponseTerms);
  this.$AutoComplete.setState({ autoSearchList: reponseTerms });
  this.setState({ autoSearchList: reponseTerms });
}

function showRecord({ target }) {
  const { value: inputValue } = target;
  handlePopUpDisplay.call(this, inputValue);
}

function handlePopUpDisplay(inputValue, reponseTerms) {
  if (inputValue === '' || reponseTerms?.length === 0) {
    closePopUp(this.$AutoComplete.$element);
    showPopUp(this.$RecentSearchList.$element);
  } else {
    closePopUp(this.$RecentSearchList.$element);
    showPopUp(this.$AutoComplete.$element);
  }
}

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
