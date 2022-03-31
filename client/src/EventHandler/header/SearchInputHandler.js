import { FetchDataManager } from "../managers/DataManager.js";
import { HistoryManager } from "../managers/HistoryManager.js";
import { KeyboadManager } from "../managers/KeyboardManager.js";

class SearchInputEventHandler {
  constructor(store, observer) {
    this.store = store;
    this.inputObserver = observer;
    this.dataManager = new FetchDataManager();
    this.historyManager = new HistoryManager();
    this.keyboardManager = new KeyboadManager();
  }

  init() {
    this.store.searchView.focusSearchZone = this.focusSearchZone.bind(this);
    this.store.searchView.inputSearchZone = this.inputSearchZone.bind(this);
    this.store.searchView.inputSpecialKey = this.inputSpecialKey.bind(this);
    this.store.searchView.init();
  }

  focusSearchZone() {
    const localdata = this.historyManager.getLocalHistory();
    this.inputObserver.notify("incomeWholeSearchHistoryData", localdata);
  }

  async inputSearchZone({ target: { value } }) {
    if (!value) return;
    const autoCompleteUri = `search/${value}`; // 추후 util폴더 constants로 추가할 예정
    const autoCompleteData = await this.dataManager.getFetchData(
      autoCompleteUri
    );

    if (autoCompleteData.length === 0) {
      return;
    }

    this.inputObserver.notify("incomeAutoCompleteData", autoCompleteData);
  }

  inputSpecialKey({ event, toggleList }) {
    const {
      key,
      target: { value },
    } = event;

    if (key === "Enter") {
      event.preventDefault();
      this.historyManager.addData2localStorage(value);
      const newHistory = this.historyManager.getLocalHistory();
      this.inputObserver.notify("incomeNewHistory", newHistory);
      return;
    }

    if (key === "ArrowUp" || key === "ArrowDown") {
      const plusOrMinus = this.keyboardManager.getIdxCount(key);
      this.inputObserver.notify("incomeHilightCount", {
        plusOrMinus,
        toggleList,
      });
    }
  }
}

export { SearchInputEventHandler };
