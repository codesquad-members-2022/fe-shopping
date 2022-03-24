class HeaderHistoryPatcher {
  constructor(searchInputToggle, searchInputView, headerKeyManager) {
    this.historyStorage = new Set(
      JSON.parse(localStorage.getItem("localSearchHistory")) // 로컬스토리지 볐다 할수있음
    );

    this.searchInputModel = searchInputToggle;
    this.searchInputView = searchInputView;
    this.headerKeyManager = headerKeyManager;
  }

  getLocalHistory() {
    return this.historyStorage;
  }

  manageHistory() {
    const historyData = this.fitHistorySize([...this.historyStorage]); // 안해도 될수도 있음 , 함수명 fit -> trim으로 추후 통일
    const DOM = this.searchInputModel.getHTML(historyData);
    this.headerKeyManager.initCount();
    this.searchInputView.renderSearchHistory(DOM);
  }

  addData2localStorage(data) {
    if (!data) {
      return;
    }
    this.historyStorage.add(data);

    localStorage.setItem(
      "localSearchHistory",
      JSON.stringify([...this.historyStorage])
    );

    this.manageHistory();
  }

  fitHistorySize() {
    const historyArr = [...this.historyStorage];
    const MAX_SIZE = 10;

    if (historyArr.length === 0) {
      return ["검색 결과가 없습니다."];
    }

    if (this.historyStorage.size > MAX_SIZE) {
      this.historyStorage.delete(historyArr[0]);
    }

    return [...this.historyStorage].reverse();
  }
}

export { HeaderHistoryPatcher };
