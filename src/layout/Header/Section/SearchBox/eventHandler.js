import { moveToSearchTermPage } from '../../../../router.js';
import {
  myLocalStorage,
  requestAutoCompleteTerms,
} from '../../../../utils/mockDB.js';
import { RECENT_SEARCH_LIST } from '../../../../constant/htmlSelector.js';
import { showPopUp, closePopUp } from '../../../../utils/manuplateDOM.js';

const INPUT_DEFAULT = -1;
const MAX_LOCAL_STORAGE = 10;

const eventHandler = {
  handleSubmit(event) {
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
  },
  handleInputClick({ target }) {
    const { value: inputValue } = target;
    handlePopUpDisplay.call(this, inputValue);
  },
  handleInputKeyDown(event) {
    event.preventDefault();
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
  },
  async handleInput(event) {
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
    const reponseTerms = await requestAutoCompleteTerms.requestTerms(
      inputValue
    );
    handlePopUpDisplay.call(this, inputValue, reponseTerms);
    this.$AutoComplete.setState({ autoSearchList: reponseTerms, inputValue });
    this.setState({ autoSearchList: reponseTerms });
  },
  changeSearchOption(option) {
    this.setState({ option });
    this.$RecentSearchList.setState({ option });
    this.$Selector.setState({ option });
  },
};

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

export default eventHandler;
