import { observable } from "./core/observer";

const initState = {
  categoryTitle: "전체",
  categoryDatas: [],
  searchWord: "",
  searchRecentDisplay: "none",
  searchSuggestionDisplay: "none",
  suggestionDatas: [],
  recentDatas: JSON.parse(localStorage.getItem("recent")) || [],
  selectedInputIdx: 0,
};

export const store = {
  state: observable(initState),
  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      this.state[key] = value;
    });
  },
};
