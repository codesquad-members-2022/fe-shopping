import AutoComplete from './AutoComplete.js';
import RecentSearchList from './RecentSearchList.js';
import Selector from './Selector.js';
import { moveToSearchTermPage } from '../../../../router.js';
import { MAX_LOCAL_STORAGE } from '../../../../constant/constant.js';
import {
  POP_UP,
  RECENT_SEARCH_LIST,
} from '../../../../constant/htmlSelector.js';
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

const INPUT_DEFAULT = -1;

export default function SearchBox($element) {
  HtmlElement.call(this, $element);
}
SearchBox.prototype = Object.create(HtmlElement.prototype);
SearchBox.prototype.constructor = SearchBox;

SearchBox.prototype.init = function () {
  this.state = {
    activeHistory: INPUT_DEFAULT,
    activeAutoTerm: INPUT_DEFAULT,
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
  const {
    option,
    recentSearchList,
    autoSearchList,
    inputValue,
    activeAutoTerm,
    activeHistory,
  } = this.state;
  const $selector = findTargetClassElement(this.$element, 'search__selector');
  const $searchRecord = findTargetClassElement(this.$element, 'search__record');
  const $searchAuto = findTargetClassElement(this.$element, 'search__auto');
  this.$Selector = new Selector($selector, {
    option,
    changeSearchOption: changeSearchOption.bind(this),
  });
  this.$RecentSearchList = new RecentSearchList($searchRecord, {
    option,
    recentSearchList,
    activeHistory,
  });
  this.$AutoComplete = new AutoComplete($searchAuto, {
    autoSearchList,
    inputValue,
    activeAutoTerm,
  });
};

SearchBox.prototype.setEvent = function () {
  const $form = findTargetIdElement(this.$element, 'searhForm');
  this.$input = findTargetIdElement($form, 'searchInput');
  // this.$input = $input;
  $form.addEventListener('submit', handleSubmit.bind(this));
  this.$input.addEventListener('click', showRecord.bind(this));
  this.$input.addEventListener('keydown', handleKeyDown.bind(this));
  this.$input.addEventListener('input', handleInput.bind(this));
};

SearchBox.prototype.setState = function (newState) {
  console.log(newState);
  this.state = { ...this.state, ...newState };
  //값이 바뀔 때마다 자식 전체를 리렌더링하지 않고 바뀐 값을 쓰는 자식만 리렌더링하기
  // this.renderChild();
};

function changeActiceHistory(newActiveHistory) {
  const { recentSearchList } = this.state;
  const newInputValue = recentSearchList[newActiveHistory] || '';
  this.$input.value = newInputValue;
  this.setState({
    activeHistory: newActiveHistory,
    inputValue: newInputValue,
  });
  this.$RecentSearchList.setState({ activeHistory: newActiveHistory });
  // handleInput.apply(this);
}

function changeActiceAutoList(newActiveAutoTerm) {
  const { autoSearchList } = this.state;
  const newInputValue = autoSearchList[newActiveAutoTerm] || '';
  this.$input.value = newInputValue;
  this.setState({
    activeAutoTerm: newActiveAutoTerm,
    inputValue: newInputValue,
  });
  this.$AutoComplete.setState({ activeAutoTerm: newActiveAutoTerm });
  // handleInput.apply(this);
}

function handleArrowDown() {
  const {
    recentSearchList,
    autoSearchList,
    activeAutoTerm,
    activeHistory,
    showHistroy,
  } = this.state;
  if (!showHistroy) {
    const newActiveAutoTerm =
      activeAutoTerm >= autoSearchList.length - 1
        ? INPUT_DEFAULT
        : activeAutoTerm + 1;
    changeActiceAutoList.call(this, newActiveAutoTerm);
  } else {
    const newActiveHistory =
      activeHistory >= recentSearchList.length - 1
        ? INPUT_DEFAULT
        : activeHistory + 1;
    changeActiceHistory.call(this, newActiveHistory);
  }
}

function handleArrowUp() {
  const {
    recentSearchList,
    autoSearchList,
    activeAutoTerm,
    activeHistory,
    showHistroy,
  } = this.state;
  if (!showHistroy) {
    const newActiveAutoTerm =
      activeAutoTerm <= INPUT_DEFAULT
        ? autoSearchList.length - 1
        : activeAutoTerm - 1;
    changeActiceAutoList.call(this, newActiveAutoTerm);
  } else {
    const newActiveHistory =
      activeHistory <= INPUT_DEFAULT
        ? recentSearchList.length - 1
        : activeHistory - 1;
    changeActiceHistory.call(this, newActiveHistory);
  }
}

function handleKeyDown(event) {
  const { key } = event;
  switch (key) {
    case 'ArrowDown':
      handleArrowDown.apply(this);
      break;
    case 'ArrowUp':
      handleArrowUp.apply(this);
    default:
      break;
  }
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
  // this.setState({ inputValue: '', recentSearchList: updatedRecentSearchList });
  this.setState({ inputValue: '' });
  this.$RecentSearchList.setState({
    recentSearchList: updatedRecentSearchList,
  });
  this.$input.value = '';
  moveToSearchTermPage(option, searchTerm);
}

async function handleInput(event) {
  const inputValue = event ? event.target.value : this.state.inputValue;
  // const { inputValue } = this.state;
  if (inputValue !== '') {
    this.setState({ showHistroy: false });
  }
  if (inputValue === '') {
    changeActiceHistory.call(this, INPUT_DEFAULT);
    this.setState({ showHistroy: true });
  }
  // 자동완성데이터를 받기 전에 handleSubmit이 실행될 수 있어서 미리 inputValue만 최신화
  this.setState({ inputValue });
  const reponseTerms = await requestAutoCompleteTerms.requestTerms(inputValue);
  handlePopUpDisplay.call(this, inputValue, reponseTerms);
  this.$AutoComplete.setState({ autoSearchList: reponseTerms, inputValue });
  this.setState({ autoSearchList: reponseTerms });
}

function changeSearchOption(option) {
  this.setState({ option });
  this.$RecentSearchList.setState({ option });
  this.$Selector.setState({ option });
}

function handleRecentSearchList(recentSearchList, inputValue) {
  if (recentSearchList.length >= MAX_LOCAL_STORAGE) {
    return [inputValue, ...recentSearchList.slice(0, -1)];
  }
  return [inputValue, ...recentSearchList];
}

function showRecord({ target }) {
  const { value: inputValue } = target;
  handlePopUpDisplay.call(this, inputValue);
}

function handlePopUpDisplay(inputValue, reponseTerms) {
  if (inputValue === '' || reponseTerms?.length === 0) {
    closePopUp(this.$AutoComplete.$element);
    showPopUp(this.$RecentSearchList.$element);
    this.setState({ showHistroy: true });
  } else {
    closePopUp(this.$RecentSearchList.$element);
    showPopUp(this.$AutoComplete.$element);
    this.setState({ showHistroy: false });
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
