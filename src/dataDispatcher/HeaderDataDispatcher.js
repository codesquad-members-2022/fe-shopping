class HedearDataDispatcher {
  constructor(
    searchInputToggle,
    searchMenuToggle,
    searchInputView,
    searchMenuView
  ) {
    this.historStorage = new Set(
      JSON.parse(localStorage.getItem("localSearchHistory")) // 로컬스토리지 볐다 할수있음
    );
    this.searchInputModel = searchInputToggle;
    this.searchMenuModel = searchMenuToggle;
    this.searchInputView = searchInputView;
    this.searchMenuView = searchMenuView;
  }

  setData2localStorage(data) {
    localStorage.setItem("localSearchHistory", JSON.stringify(data));
  }

  disposeData(data) {
    this.setData2localStorage(data);
  }

  set searchInputData(data) {
    if (data.length === 0) {
      // 나중에 router쪽에서 값이 없으면 차단하는것도 고려
      return;
    }
    const inputData = this.checkdataSize(data);
    const DOM = this.searchInputModel.getHTML(inputData);
    this.searchInputView.render(DOM);
  }

  get searchInputData() {
    const historyData = this.checkHistorySize([...this.historStorage]); // 안해도 될수도 있음
    const DOM = this.searchInputModel.getHTML(historyData);
    this.searchInputView.render(DOM);
  }

  set searchMenuData(data) {
    const menuDOM = this.searchMenuModel.getHTML(data);
    this.searchMenuData.render(menuDOM);
  }

  //   get searchMenuData() {}

  checkdataSize(...data) {
    const MAX_SIZE = 10;

    if (data.length > MAX_SIZE) {
      data.splice(MAX_SIZE, data.length);
    }

    return data;
  }

  checkHistorySize() {
    const historyArr = [...this.historStorage];
    const MAX_SIZE = 10;

    if (historyArr.length === 0) {
      return ["검색 결과가 없습니다."];
    }

    if (this.historStorage >= MAX_SIZE) {
      this.historStorage.delete(historyArr[0]);
    }

    return [...this.historStorage].reverse();
  }
}
