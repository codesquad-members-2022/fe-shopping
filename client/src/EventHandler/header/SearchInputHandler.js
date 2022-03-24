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
        this.historyManager.addData2localStorage(value);
        return;
      }

      if (key === "ArrowUp" || key === "ArrowDown") {
        this.keyboardManager.searchInputArrow(key);
      }
    });
  }

  onInputEvent({ target: { value } }) {
    const uri = `search/${value}`; // 추후 util폴더 constants로 추가할 예정
    this.router.setAutoCompleteData(uri);
  }

  onFocusEvent() {
    this.historyManager.manageHistory();
  }
}

export { SearchInputEventHandler };
