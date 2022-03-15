import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";
import { delay, request } from "../../../../core/utils";

function SearchInput(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchInput, Component);

SearchInput.prototype.setup = function () {
  this.state = {
    inputData: "",
  };
};
SearchInput.prototype.setEvent = function () {
  this.addEvent("focusout", "input[type='text']", () => {
    const { searchSuggestion, searchRecent } = this.$props;
    searchSuggestion.setState({ display: "none" });
    searchRecent.setState({ display: "none" });
  });
  this.addEvent("focusin", "input[type='text']", () => {
    const { inputData } = this.state;
    const { searchRecent, searchSuggestion } = this.$props;
    if (inputData) {
      searchSuggestion.setState({ display: "flex" });
      searchRecent.setState({ display: "none" });
    } else {
      searchSuggestion.setState({ display: "none" });
      searchRecent.setState({ display: "flex" });
    }
  });
  this.addEvent("keyup", "input[type='text']", ({ target }) => {
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
  });
};

SearchInput.prototype.mount = function () {
  const $input = this.$target.querySelector("input");
  const curInput = $input.value;
  if (curInput) {
    $input.focus();
    $input.value = "";
    $input.value = curInput;
  }
};

SearchInput.prototype.template = function () {
  const { inputData } = this.state;
  return `
    <input type="text" placeholder="찾고 싶은 상품을 검색해보세요!" value="${inputData}"/>
    <span class="input__icon">
        <i class="fas fa-microphone"></i>
    </span>
    <span class="input__icon">
        <i class="fas fa-search"></i>
    </span>

  `;
};

export default SearchInput;
