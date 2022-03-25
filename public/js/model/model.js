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
    callBackFn(this.recentWordData, this.searchBarState);
  },

  get recentWordData() {
    return this._recentWordData;
  },

  set suggestWordData(data) {
    this._suggestWordData = data;
  },

  get suggestWordData() {
    return this._suggestWordData;
  },

  set searchWord(word) {
    this._searchWord = word;
  },

  get searchWord() {
    return this._searchWord;
  },

  setSelectedIdx({ idx, callBackFn }) {
    this._selectedIdx = idx;
    callBackFn();
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
