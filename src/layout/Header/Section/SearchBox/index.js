import HtmlElement from '../../../../utils/HtmlElement.js';
import AutoComplete from './AutoComplete.js';
import RecentSearchList from './RecentSearchList.js';
import Selector from './Selector.js';
import { moveToSearchTermPage } from '../../../../router.js';
import {
  myLocalStorage,
  requestAutoCompleteTerms,
} from '../../../../utils/mockDB.js';
import {
  findTargetClassElement,
  findTargetIdElement,
  showPopUp,
  closePopUp,
} from '../../../../utils/manuplateDOM.js';
import {
  POP_UP,
  RECENT_SEARCH_LIST,
} from '../../../../constant/htmlSelector.js';

const INPUT_DEFAULT = -1;
const MAX_LOCAL_STORAGE = 10;

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
  this.$form = findTargetIdElement(this.$element, 'searhForm');
  this.$input = findTargetIdElement(this.$form, 'searchInput');
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

function handleInputClick({ target }) {
  const { value: inputValue } = target;
  handlePopUpDisplay.call(this, inputValue);
}

function handleInputKeyDown(event) {
  const { key } = event;
  const activeElement = setActiveElement.apply(this);
  switch (key) {
    case 'ArrowDown':
      const newArrowDownTerm = handleArrowDown(activeElement);
      changeActiveList.call(this, {
        ...activeElement,
        newActiveTerm: newArrowDownTerm,
      });
      break;
    case 'ArrowUp':
      const newArrowUpTerm = handleArrowUp(activeElement);
      changeActiveList.call(this, {
        ...activeElement,
        newActiveTerm: newArrowUpTerm,
      });
      break;
    default:
      break;
  }
}

async function handleInput(event) {
  const { inputValue: value, activeHistory, recentSearchList } = this.state;
  const inputValue = event ? event.target.value : value;
  if (inputValue !== '') {
    this.setState({ showHistroy: false });
  } else {
    this.setState({ showHistroy: true });
    // 백스페이스로 input이 비었을 때 최근검색어 목록에서 하이라이트 지우기
    changeActiveList.call(this, {
      newActiveTerm: INPUT_DEFAULT,
      $targetChild: this.$RecentSearchList,
      activeTerm: { key: 'activeHistory', value: activeHistory },
      activeList: recentSearchList,
    });
  }
  // 자동완성데이터를 받기 전에 handleSubmit이 실행될 수 있어서 미리 inputValue만 최신화
  this.setState({ inputValue });
  const reponseTerms = await requestAutoCompleteTerms.requestTerms(inputValue);
  handlePopUpDisplay.call(this, inputValue, reponseTerms);
  this.$AutoComplete.setState({ autoSearchList: reponseTerms, inputValue });
  this.setState({ autoSearchList: reponseTerms });
}

function changeActiveList({
  newActiveTerm,
  activeTerm,
  activeList,
  $targetChild,
}) {
  const newInputValue = activeList[newActiveTerm] || '';
  this.setState({
    [`${activeTerm.key}`]: newActiveTerm,
    inputValue: newInputValue,
  });
  $targetChild.setState({ [`${activeTerm.key}`]: newActiveTerm });
  this.$input.value = newInputValue;
}

function handleArrowDown(activeElement) {
  const { activeTerm, activeList } = activeElement;
  return activeTerm.value >= activeList.length - 1
    ? INPUT_DEFAULT
    : activeTerm.value + 1;
}

function handleArrowUp(activeElement) {
  const { activeTerm, activeList } = activeElement;
  return activeTerm.value <= INPUT_DEFAULT
    ? activeList.length - 1
    : activeTerm.value - 1;
}

function setActiveElement() {
  const {
    recentSearchList,
    autoSearchList,
    activeAutoTerm,
    activeHistory,
    showHistroy,
  } = this.state;
  return showHistroy
    ? {
        $targetChild: this.$RecentSearchList,
        activeTerm: { key: 'activeHistory', value: activeHistory },
        activeList: recentSearchList,
      }
    : {
        $targetChild: this.$AutoComplete,
        activeTerm: { key: 'activeAutoTerm', value: activeAutoTerm },
        activeList: autoSearchList,
      };
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
