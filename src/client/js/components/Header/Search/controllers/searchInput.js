import { delay, request } from "../../../../utils";
import { store } from "../../../../Store";

const MAX_SEARCH_DATA = 9;
const MAX_RECENT_DATA = 7;

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
  const { searchWord, recentDatas } = store.state;
  store.setState({
    searchRecentDisplay: recentDatas.length ? "flex" : "none",
    searchSuggestionDisplay: searchWord ? "flex" : "none",
  });
};

const getSelectedData = (target) => {
  // suggestionBody or recentBody
  const $suggestionBody =
    target.parentNode.parentNode.querySelector(".suggestion__body");
  const $selected = $suggestionBody.querySelector(".selected");
  return $selected ? $selected.textContent : null;
};

const handleKeyUpArrowUpDown = ({ target, key }) => {
  const { selectedInputIdx } = store.state;

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

const handleKeyUpEnter = ({ target }) => {
  if (target.value === "") return;
  const { recentDatas } = store.state;
  const filteredRecentDatas = recentDatas.filter(
    (data) => data !== target.value
  );
  const sliceMaximumDatas =
    filteredRecentDatas.length >= MAX_RECENT_DATA
      ? filteredRecentDatas.slice(0, MAX_RECENT_DATA - 1)
      : filteredRecentDatas;

  const newRecentDatas = [target.value, ...sliceMaximumDatas];
  target.value = "";
  localStorage.setItem("recent", JSON.stringify(newRecentDatas));
  store.setState({ searchWord: "", recentDatas: newRecentDatas });
  handleInputFocusIn();
};

const handleSearchIconClick = ({ target }) => {
  const $input = target.parentNode.parentNode.querySelector("input");
  handleKeyUpEnter({ target: $input });
};

const handleKeyupWithFocus = ({ target, key }) => {
  if (key === "ArrowDown" || key === "ArrowUp") {
    handleKeyUpArrowUpDown({ target, key });
    return;
  }
  if (key === "Enter") {
    handleKeyUpEnter({ target });
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
      searchRecentDisplay: store.state.recentDatas.length ? "flex" : "none",
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
  handleKeyupWithFocus,
  handleKeyUpEnter,
  handleSearchIconClick,
};
