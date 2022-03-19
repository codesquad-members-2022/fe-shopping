import {
  MAX_LOCAL_STORAGE,
  RECENT_SEARCH_LIST,
} from '../../constant/constant.js';
import { moveToSearchTermPage } from '../../router.js';
import HtmlElement from '../../utils/HtmlElement.js';
import {
  findTargetIdElement,
  handleDisplayElement,
} from '../../utils/manuplateDOM.js';
import { myLocalStorage } from '../../utils/util.js';
import RecentSearchList from './RecentSearchList.js';

export default function FormContainer(htmlTag, $parent) {
  this.$ul = null;
  this.state = {
    inputValue: '',
  };
  HtmlElement.call(this, htmlTag, $parent);
}

FormContainer.prototype = Object.create(HtmlElement.prototype);
FormContainer.prototype.constructor = FormContainer;

FormContainer.prototype.setTemplate = function () {
  this.$element.classList.add('search__container');
  this.$element.innerHTML = template;
  this.$ul = new RecentSearchList('ul', this.$element);
};

FormContainer.prototype.setEvent = function () {
  const $form = findTargetIdElement(this.$element, 'searhForm');
  const $input = findTargetIdElement($form, 'searchInput');
  this.$input = $input;
  $form.addEventListener('submit', handleSubmit.bind(this));
  $input.addEventListener('click', showRecord.bind(this));
  $input.addEventListener('input', handleInput.bind(this));
};

FormContainer.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
};

function handleRecentSearchList(recentSearchList, inputValue) {
  if (recentSearchList.length >= MAX_LOCAL_STORAGE) {
    return [inputValue, ...recentSearchList.slice(0, -1)];
  }
  return [inputValue, ...recentSearchList];
}

function handleSubmit(event) {
  event.preventDefault();
  const { inputValue } = this.state;
  const searchTerm = inputValue;
  const { recentSearchList } = this.$ul.state;
  const updatedRecentSearchList = handleRecentSearchList(
    recentSearchList,
    inputValue
  );
  myLocalStorage.set(RECENT_SEARCH_LIST, updatedRecentSearchList);
  this.setState({ inputValue: '' });
  this.$ul.setState({ recentSearchList: updatedRecentSearchList });
  this.$input.value = '';
  moveToSearchTermPage(searchTerm);
}

function handleInput({ target }) {
  const { value: inputValue } = target;
  this.setState({ inputValue });
  // target.focus();
}

function showRecord() {
  const $record = findTargetIdElement(this.$element, 'searchRecord');
  handleDisplayElement($record);
}

const template = `<form class="search__form" id="searhForm">
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
`;
