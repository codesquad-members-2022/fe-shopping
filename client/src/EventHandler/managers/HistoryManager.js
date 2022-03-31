class HistoryManager {
  constructor() {
    this.historyStorage = new Set(
      JSON.parse(localStorage.getItem("localSearchHistory")) // 로컬스토리지 볐다 할수있음
    );
  }

  getLocalHistory() {
    return [...this.historyStorage];
  }

  addData2localStorage(data) {
    if (!data) {
      return;
    }
    this.historyStorage.add(data);
    const fitData = this.fitHistorySize(this.historyStorage);
    localStorage.setItem("localSearchHistory", JSON.stringify([...fitData]));
  }

  fitHistorySize(data) {
    const historyArr = [...data];
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

export { HistoryManager };
