class HeaderHistoryPatcher {
  constructor(searchInputToggle, searchInputView, headerKeyManager) {
    this.historStorage = new Set(
      JSON.parse(localStorage.getItem("localSearchHistory")) // 로컬스토리지 볐다 할수있음
    );

    this.searchInputModel = searchInputToggle;
    this.searchInputView = searchInputView;
    this.headerKeyManager = headerKeyManager;
  }

  manageHistory() {
    const historyData = this.checkHistorySize([...this.historStorage]); // 안해도 될수도 있음 , 함수명 check -> trim으로 추후 통일
    const DOM = this.searchInputModel.getHTML(historyData);
    this.headerKeyManager.initCount();
    this.searchInputView.renderSearchHistory(DOM);
  }

  addData2localStorage(data) {
    if (!data) {
      return;
    }
    this.historStorage.add(data);

    localStorage.setItem(
      "localSearchHistory",
      JSON.stringify([...this.historStorage])
    );

    this.manageHistory();
  }

  checkHistorySize() {
    const historyArr = [...this.historStorage];
    const MAX_SIZE = 10;

    if (historyArr.length === 0) {
      return ["검색 결과가 없습니다."];
    }

    if (this.historStorage.size > MAX_SIZE) {
      this.historStorage.delete(historyArr[0]);
    }

    return [...this.historStorage].reverse();
  }
}

export { HeaderHistoryPatcher };
