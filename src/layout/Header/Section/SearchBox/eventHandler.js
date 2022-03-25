import { moveToSearchTermPage } from '../../../../router.js';
import EventHandler from '../../../../utils/EventHandler.js';
import {
  myLocalStorage,
  requestAutoCompleteTerms,
} from '../../../../utils/mockDB.js';
import { showPopUp, closePopUp } from '../../../../utils/manuplateDOM.js';
import { SEARCH_BOX } from '../../../../constant.js';

const {
  INPUT_DEFAULT,
  MAX_LOCAL_STORAGE,
  HISTORY: { HISTORY_LOCAL_STORAGE_KEY },
} = SEARCH_BOX;

const eventHandler = new EventHandler();

eventHandler.setSubLogic({
  changeActiveList,
  handleArrowDown,
  handleArrowUp,
  setActiveElement,
  handlehistroyList,
  handlePopUpDisplay,
});

eventHandler.setCoreHandler({
  handleSubmit,
  handleInputClick,
  handleInputKeyDown,
  handleInput,
  changeSearchOption,
});

function handleSubmit(event) {
  event.preventDefault();
  const { option, inputValue } = this.state;
  const {
    subLogic: { handlehistroyList },
  } = this.eventHandler;
  const searchTerm = inputValue;
  const { histroyList } = this.$HistoryList.state;
  const updatedHistroyList = handlehistroyList(histroyList, inputValue);
  myLocalStorage.set(HISTORY_LOCAL_STORAGE_KEY, updatedHistroyList);
  this.setState({ inputValue: '' });
  this.$HistoryList.setState({
    histroyList: updatedHistroyList,
  });
  this.$input.value = '';
  moveToSearchTermPage(option, searchTerm);
}

function handleInputClick({ target }) {
  const { value: inputValue } = target;
  this.eventHandler.subLogic.handlePopUpDisplay.call(this, inputValue);
}
function handleInputKeyDown(event) {
  const { key } = event;
  const {
    subLogic: { setActiveElement, changeActiveList },
  } = this.eventHandler;
  const activeElement = setActiveElement.call(this);
  switch (key) {
    case 'ArrowDown':
      const newArrowDownTerm = handleArrowDown(activeElement);
      changeActiveList.call(this, {
        ...activeElement,
        newActiveTerm: newArrowDownTerm,
      });
      break;
    case 'ArrowUp':
      event.preventDefault();
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
  const { inputValue: value, activeHistory, histroyList } = this.state;
  const {
    subLogic: { changeActiveList, handlePopUpDisplay },
  } = this.eventHandler;
  const inputValue = event ? event.target.value : value;
  if (inputValue !== '') {
    this.setState({ showHistroy: false });
  } else {
    this.setState({ showHistroy: true });
    // 백스페이스로 input이 비었을 때 최근검색어 목록에서 하이라이트 지우기
    changeActiveList.call(this, {
      newActiveTerm: INPUT_DEFAULT,
      $targetChild: this.$HistoryList,
      activeTerm: { key: 'activeHistory', value: activeHistory },
      activeList: histroyList,
    });
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
  this.$HistoryList.setState({ option });
  this.$ScopeSelector.setState({ option });
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
    histroyList,
    autoSearchList,
    activeAutoTerm,
    activeHistory,
    showHistroy,
  } = this.state;
  return showHistroy
    ? {
        $targetChild: this.$HistoryList,
        activeTerm: { key: 'activeHistory', value: activeHistory },
        activeList: histroyList,
      }
    : {
        $targetChild: this.$AutoComplete,
        activeTerm: { key: 'activeAutoTerm', value: activeAutoTerm },
        activeList: autoSearchList,
      };
}

function handlehistroyList(histroyList, inputValue) {
  if (histroyList.length >= MAX_LOCAL_STORAGE) {
    return [inputValue, ...histroyList.slice(0, -1)];
  }
  return [inputValue, ...histroyList];
}

function handlePopUpDisplay(inputValue, reponseTerms) {
  if (inputValue === '' || reponseTerms?.length === 0) {
    closePopUp(this.$AutoComplete.$element);
    showPopUp(this.$HistoryList.$element);
    this.setState({ showHistroy: true });
  } else {
    closePopUp(this.$HistoryList.$element);
    showPopUp(this.$AutoComplete.$element);
    this.setState({ showHistroy: false });
  }
}

export default eventHandler;
