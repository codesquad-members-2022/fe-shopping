export const model = {
  init() {
    this._searchBarState = "recent-search";
    this._recentWordData = [];
    this._suggestWordData = [];
    this._searchWord = "";
    this._searchDataCnt = 0;
    this._selectedIdx = -1;
  },

  setSearchBarState({ state, callBackFn }) {
    this._searchBarState = state;
    callBackFn(this.searchBarState);
  },

  get searchBarState() {
    return this._searchBarState;
  },

  setRecentWordData({ data, callBackFn }) {
    this._recentWordData = data;
    this.searchDataCnt = data ? data.length : 0;
    callBackFn({
      data: this.recentWordData,
      state: this.searchBarState,
    });
  },

  get recentWordData() {
    return this._recentWordData;
  },

  setSuggestWordData({ data, callBackFn }) {
    this._suggestWordData = data;
    callBackFn({
      data: this.suggestWordData,
      state: this.searchBarState,
      searchWord: this.searchWord,
    });
  },

  get suggestWordData() {
    return this._suggestWordData;
  },

  set searchWord(word) {
    this._searchWord = word;
    console.log(this.searchWord);
    console.log(this._searchWord);
  },

  get searchWord() {
    return this._searchWord;
  },

  setSelectedIdx({ idx, callBackFn }) {
    this._selectedIdx = idx;
    callBackFn(this.selectedIdx);
  },

  get selectedIdx() {
    return this._selectedIdx;
  },

  set searchDataCnt(num) {
    this._searchDataCnt = num;
  },

  get searchDataCnt() {
    return this._searchDataCnt;
  },
};
