export const model = {
  init() {
    this._searchBarState = "recent-search";
    this._recentWordData = [];
    this._suggestWordData = [];
    this._searchWord = "";
    this._searchDataCnt = 0;
    this._selectedIdx = -1;
  },

  set searchBarState(state) {
    this._searchBarState = state;
  },

  get searchBarState() {
    return this._searchBarState;
  },

  set recentWordData(data) {
    this._recentWordData = data;
    this.searchDataCnt = data ? data.length : 0;
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

  set selectedIdx(idx) {
    this._selectedIdx = idx;
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
