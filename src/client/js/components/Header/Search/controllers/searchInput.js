import { delay, request } from "../../../../core/utils";

const moveCursorToEnd = ($input, len) => {
  delay(0).then(() => {
    $input.setSelectionRange(len, len);
  });
};

function handleInputFocusOut() {
  const { searchSuggestion, searchRecent } = this.$props;
  searchSuggestion.setState({ display: "none" });
  searchRecent.setState({ display: "none" });
}

function handleInputFocusIn() {
  const { inputData } = this.state;
  const { searchRecent, searchSuggestion } = this.$props;
  if (inputData) {
    searchSuggestion.setState({ display: "flex" });
    searchRecent.setState({ display: "none" });
  } else {
    searchSuggestion.setState({ display: "none" });
    searchRecent.setState({ display: "flex" });
  }
}

function handleArrowKeydown({ key }) {
  const $input = this.$target.querySelector("input");
  const { searchSuggestion, searchRecent } = this.$props;
  const {
    state: { display: sgDisplay },
  } = searchSuggestion;
  const curLayout = sgDisplay === "flex" ? searchSuggestion : searchRecent;
  const { selectedIndex } = curLayout.state;
  const MAX_SEARCH_DATA = 9;
  if (key === "ArrowDown") {
    if (selectedIndex === MAX_SEARCH_DATA) return;
    curLayout.setState({ selectedIndex: selectedIndex + 1 });
    const selectedData = curLayout.getSelectedData();
    $input.value = selectedData;
  } else if (key === "ArrowUp") {
    if (selectedIndex === 0) return;
    curLayout.setState({ selectedIndex: selectedIndex - 1 });
    const selectedData = curLayout.getSelectedData();
    const inputValue =
      selectedIndex - 1 !== 0 ? selectedData : this.state.inputData;
    $input.value = inputValue;
    moveCursorToEnd($input, inputValue.length);
  }
}

function handleKeyupWithFocus({ target, key }) {
  if (key === "ArrowDown" || key === "ArrowUp") {
    return;
  }
  const { searchSuggestion, searchRecent } = this.$props;
  this.state.inputData = target.value;
  if (target.value) {
    searchRecent.setState({ display: "none" });
    searchRecent.setState({ selectedIndex: 0 });
  } else {
    searchSuggestion.setState({ display: "none" });
    searchSuggestion.setState({ selectedIndex: 0 });
    searchRecent.setState({ display: "flex" });
    return;
  }
  /* 5초 뒤에도 같은 값인지 확인 하기위한 변수 */
  const curValue = target.value;
  delay(500).then(async () => {
    const isFinishInput = this.state.inputData === curValue;
    if (isFinishInput) {
      const requestOptions = {
        query: {
          keyword: curValue,
        },
      };
      const { results: suggestionDatas } = await request(
        "search/autoComplete",
        requestOptions
      );
      if (suggestionDatas?.length) {
        searchSuggestion.setState({
          suggestionDatas,
          word: curValue,
          display: "flex",
        });
      } else {
        searchSuggestion.setState({ display: "none" });
      }
    }
  });
}

export {
  handleInputFocusIn,
  handleInputFocusOut,
  handleArrowKeydown,
  handleKeyupWithFocus,
};
