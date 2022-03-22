class HedearDataDispatcher {
  constructor(searchInputToggle, searchMenuToggle) {
    this.historStorage = new Set(
      JSON.parse(localStorage.getItem("localSearchHistory")) // 로컬스토리지 볐다 할수있음
    );
    this.searchInputModel = searchInputToggle;
    this.searchMenuModel = searchMenuToggle;
  }

  setData2localStorage(data) {
    localStorage.setItem("localSearchHistory", JSON.stringify(data));
  }

  disposeData(data) {
    this.setData2localStorage(data);
  }

  set searchInputData(data) {
    this.checkdataSize;
    // 뒤집기
    // localStorage저장하기
  }

  get searchInputData() {
    //
  }

  set searchMenuData(data) {}
  get searchMenuData() {
    this.checkHistorySize;
  }

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

    if (this.historStorage >= MAX_SIZE) {
      this.historStorage.delete(historyArr[0]);
    }
  }
}
