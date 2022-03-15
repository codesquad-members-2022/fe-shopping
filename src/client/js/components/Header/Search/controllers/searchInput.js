import { delay, request } from "../../../../core/utils";

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

function handleKeyupWithFocus({ target, key }) {
  const { searchSuggestion, searchRecent } = this.$props;
  if (target.value) {
    searchRecent.setState({ display: "none" });
  } else {
    searchRecent.setState({ display: "flex" });
  }
  this.state.inputData = target.value;
  /* 5초 뒤에도 같은 값인지 확인 하기위한 변수 */
  const curValue = target.value;
  delay(500).then(async () => {
    if (this.state.inputData === curValue) {
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

export { handleInputFocusIn, handleInputFocusOut, handleKeyupWithFocus };
