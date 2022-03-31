import { moveToSearchTermPage } from '../../../../router.js';
import {
  myLocalStorage,
  requestAutoCompleteTerms,
} from '../../../../utils/mockDB.js';
import { SEARCH_BOX } from '../../../../constant.js';

const {
  INPUT_DEFAULT,
  MAX_LOCAL_STORAGE,
  HISTORY: { HISTORY_LOCAL_STORAGE_KEY },
} = SEARCH_BOX;

export function handleSubmit(event) {
  event.preventDefault();
  const { inputValue, option, histroyList } = this.interface.getStatefromStore({
    inputValue: null,
    option: null,
    histroyList: null,
  });
  const updatedHistroyList = handlehistroyList(histroyList, inputValue);
  myLocalStorage.set(HISTORY_LOCAL_STORAGE_KEY, updatedHistroyList);
  this.interface.setStateToStore({
    newState: { inputValue: '', histroyList: updatedHistroyList },
  });
  this.$input.value = '';
  moveToSearchTermPage(option, inputValue);
}

export function handleInputClick({ target }) {
  const { value: inputValue } = target;
  handlePopUpDisplay.call(this, inputValue);
}

export function handleInputKeyDown(event) {
  const { key } = event;
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

export async function handleInput(event) {
  const { inputValue: value } = this.interface.getStatefromStore({
    inputValue: null,
  });
  const inputValue = event ? event.target.value : value;
  // 자동완성데이터를 받기 전에 handleSubmit이 실행될 수 있어서 미리 inputValue만 최신화
  this.interface.setStateToStore({
    newState: { inputValue },
  });
  const reponseTerms = await requestAutoCompleteTerms.requestTerms(inputValue);
  this.interface.setStateToStore({
    newState: { autoSearchList: reponseTerms },
  });
  handlePopUpDisplay.call(this, inputValue, reponseTerms);
}

function changeActiveList({ newActiveTerm, activeTerm, activeList }) {
  const newInputValue = activeList[newActiveTerm] || '';
  this.interface.setStateToStore({
    newState: {
      [`${activeTerm.key}`]: newActiveTerm,
      inputValue: newInputValue,
    },
  });
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
  } = this.interface.getStatefromStore({
    histroyList: null,
    autoSearchList: null,
    activeAutoTerm: null,
    activeHistory: null,
    showHistroy: null,
  });
  return showHistroy
    ? {
        activeTerm: { key: 'activeHistory', value: activeHistory },
        activeList: histroyList,
      }
    : {
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
    this.interface.setStateToStore({
      newState: { showHistroy: true },
    });
  } else {
    this.interface.setStateToStore({
      newState: { showHistroy: false },
    });
  }
}
