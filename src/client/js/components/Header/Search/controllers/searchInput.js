import { delay, request } from "../../../../utils";
import { store } from "../../../../Store";

const moveCursorToEnd = ($input, len) => {
  delay(0).then(() => {
    $input.setSelectionRange(len, len);
  });
};

const handleInputFocusOut = () => {
  store.setState({
    searchRecentDisplay: "none",
    searchSuggestionDisplay: "none",
  });
};

const handleInputFocusIn = () => {
  const { searchWord } = store.state;
  if (searchWord) {
    store.setState({
      searchRecentDisplay: "none",
      searchSuggestionDisplay: "flex",
    });
  } else {
    store.setState({
      searchRecentDisplay: "flex",
      searchSuggestionDisplay: "none",
    });
  }
};

const getSelectedData = (target) => {
  const $suggestionBody =
    target.parentNode.parentNode.querySelector(".suggestion__body");
  const $selected = $suggestionBody.querySelector(".selected");
  return $selected ? $selected.textContent : null;
};

const handleArrowKeydown = ({ target, key }) => {
  const { selectedInputIdx } = store.state;
  const MAX_SEARCH_DATA = 9;

  const possibleArrowUp = key === "ArrowUp" && selectedInputIdx !== 0;
  const possibleArrowdown =
    key === "ArrowDown" && selectedInputIdx !== MAX_SEARCH_DATA;

  if (!possibleArrowUp && !possibleArrowdown) return;

  store.setState({
    selectedInputIdx:
      key === "ArrowDown" ? selectedInputIdx + 1 : selectedInputIdx - 1,
  });

  const isSelectedIdxZero = selectedInputIdx - 1 === 0;

  const selectedData = isSelectedIdxZero
    ? store.state.searchWord
    : getSelectedData(target);

  target.value = selectedData;

  moveCursorToEnd(target, target.value.length);
};

const handleKeyupWithFocus = ({ target, key }) => {
  if (key === "ArrowDown" || key === "ArrowUp") {
    return;
  }
  if (target.value) {
    store.setState({
      searchRecentDisplay: "none",
      selectedInputIdx: 0,
    });
  } else {
    store.setState({
      searchSuggestionDisplay: "none",
      searchRecentDisplay: "flex",
      selectedInputIdx: 0,
    });
  }
  /* 5초 뒤에도 같은 값인지 확인 하기위한 변수 */
  const searchWord = target.value;
  delay(500).then(async () => {
    const isFinishInput = target.value === searchWord;
    if (isFinishInput) {
      const requestOptions = {
        query: {
          keyword: searchWord,
        },
      };
      const { results: suggestionDatas } = await request(
        "search/autoComplete",
        requestOptions
      );
      if (suggestionDatas?.length) {
        store.setState({
          suggestionDatas,
          searchWord,
          searchSuggestionDisplay: "flex",
        });
      } else {
        store.setState({
          searchSuggestionDisplay: "none",
        });
      }
    }
  });
};

export {
  handleInputFocusIn,
  handleInputFocusOut,
  handleArrowKeydown,
  handleKeyupWithFocus,
};
