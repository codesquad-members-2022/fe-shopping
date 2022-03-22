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
  store.setState({
    searchRecentDisplay: searchWord ? "none" : "flex",
    searchSuggestionDisplay: searchWord ? "flex" : "none",
  });
};

const getSelectedData = (target) => {
  const { searchRecentDisplay, searchWord } = store.state;
  const isSearchRecent = searchRecentDisplay === "flex";
  const layoutSelector = isSearchRecent ? ".recent__body" : ".suggestion__body";
  const $layoutBody =
    target.parentNode.parentNode.querySelector(layoutSelector);
  const $selected = $layoutBody.querySelector(".selected");
  const idxZeroString = isSearchRecent ? "" : searchWord;
  return $selected ? $selected.textContent : idxZeroString;
};

const handleKeyUpArrowUpDown = ({ target, key }) => {
  const {
    selectedInputIdx,
    suggestionDatas,
    recentDatas,
    searchRecentDisplay,
  } = store.state;

  const MAX_SEARCH_DATA =
    searchRecentDisplay === "flex"
      ? recentDatas.length
      : suggestionDatas.length;

  const possibleArrowUp = key === "ArrowUp" && selectedInputIdx !== 0;
  const possibleArrowdown =
    key === "ArrowDown" && selectedInputIdx !== MAX_SEARCH_DATA;

  if (!possibleArrowUp && !possibleArrowdown) return;

  store.setState({
    selectedInputIdx:
      key === "ArrowDown" ? selectedInputIdx + 1 : selectedInputIdx - 1,
  });

  const selectedData = getSelectedData(target);
  target.value = selectedData;
  moveCursorToEnd(target, target.value.length);
};

const handleKeyUpEnter = ({ target }) => {
  if (target.value === "") return;
  const MAX_RECENT_DATA = 7;
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

  const { recentDatas } = store.state;

  if (target.value) {
    store.setState({
      searchRecentDisplay: "none",
      selectedInputIdx: 0,
    });
  } else {
    store.setState({
      searchSuggestionDisplay: "none",
      searchRecentDisplay: recentDatas.length ? "flex" : "none",
      selectedInputIdx: 0,
      searchWord: "",
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
