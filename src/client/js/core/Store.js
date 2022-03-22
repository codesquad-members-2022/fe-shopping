import { observable } from "./observer";

const initState = {
  categoryTitle: "전체",
  categoryDatas: [],
  searchRecentDisplay: "none",
  searchSuggestionDisplay: "none",
  selectedInputIdx: 0,
  suggestionDatas: [],
  searchWord: "",
};

export const store = {
  state: observable(initState),
  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      this.state[key] = value;
    });
  },
};
