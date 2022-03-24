class SearchInputEventHandler {
  constructor(dom, router, historyManager, keyboardManager) {
    this.targetDom = dom;
    this.router = router;
    this.historyManager = historyManager;
    this.keyboardManager = keyboardManager;
  }

  init() {
    this.addFocusEvent();
    this.addInputEvent();
    this.addSpecialKeyEvent();
  }

  addFocusEvent() {
    this.targetDom.addEventListener("focus", () => this.onFocusEvent());
  }

  addInputEvent() {
    this.targetDom.addEventListener("input", (event) =>
      this.onInputEvent(event)
    );
  }

  addSpecialKeyEvent() {
    this.targetDom.addEventListener("keydown", (event) => {
      const {
        key,
        target: { value },
      } = event;

      if (key === "Enter") {
        event.preventDefault();
        const localData = this.historyManager.addData2localStorage(value);
        const fitData = this.historyManager.fitHistorySize(localData);
        this.historyManager.observer.notify(fitData);
        return;
      }

      if (key === "ArrowUp" || key === "ArrowDown") {
        this.keyboardManager.searchInputArrow(key);
      }
    });
  }

  async onInputEvent({ target: { value } }) {
    const uri = `search/${value}`; // 추후 util폴더 constants로 추가할 예정
    const autoCompleteData = await this.router.setAutoCompleteData(uri);
    this.router.observer.notify(autoCompleteData);
  }

  onFocusEvent() {
    const localdata = this.historyManager.getLocalHistory();
    const fitData = this.historyManager.fitHistorySize(localdata);
    this.historyManager.observer.notify(fitData);
    // controller에 옵저버를 등록하고 사용할지(보기 편할것같아) historyManager에 등록하고 사용할지 고민하다 Data변화를 관측한다는 의미에서 historyManager에 observer를 등록했습니다.
  }
}

export { SearchInputEventHandler };
