import { observable } from "./core/observer";

const initState = {
  categoryTitle: "전체",
  categoryDatas: [],
  searchRecentDisplay: "none",
  searchSuggestionDisplay: "none",
  selectedInputIdx: 0,
  suggestionDatas: [],
  recentDatas: JSON.parse(localStorage.getItem("recent")) || [],
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
