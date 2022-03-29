import { observable } from "./core/observer";

const initState = {
  categoryTitle: "전체",
  categoryDatas: [],
  mainCategory: {},
  subCategoryDatas: [],
  searchCategoryDatas: [],
  searchWord: "",
  searchRecentDisplay: "none",
  searchSuggestionDisplay: "none",
  suggestionDatas: [],
  recentDatas: JSON.parse(localStorage.getItem("recent")) || [],
  selectedInputIdx: 0,
};

const store = {
  state: observable(initState),
  setState(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      this.state[key] = value;
    });
  },
};

export { store };
