import { delay, request, debounce } from "../../../../utils";
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

const fetchSuggestionData = async (searchWord) => {
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
};

const handleKeyUpOthers = ({ target }) => {
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
  fetchSuggestionData(target.value);
};

const handleKeyupWithFocus = (event) => {
  const { key } = event;
  if (key === "ArrowDown" || key === "ArrowUp") {
    return handleKeyUpArrowUpDown.call(undefined, event);
  }
  if (key === "Enter") {
    return handleKeyUpEnter.call(undefined, event);
  }
  return debounce({
    msTime: 500,
    callback: handleKeyUpOthers,
  }).call(undefined, event);
};

export {
  handleInputFocusIn,
  handleInputFocusOut,
  handleKeyupWithFocus,
  handleKeyUpEnter,
  handleSearchIconClick,
};
