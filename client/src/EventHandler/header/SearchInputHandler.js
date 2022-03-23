class SearchInputEventHandler {
  constructor(dom, router, historyManager) {
    this.targetDom = dom;
    this.router = router;
    this.historyManager = historyManager;
  }

  init() {
    this.addFocusEvent();
    this.addInputEvent();
    this.addEnterEvent();
  }

  addFocusEvent() {
    this.targetDom.addEventListener("focus", () => this.onFocusEvent());
  }

  addInputEvent() {
    this.targetDom.addEventListener("input", (event) =>
      this.onInputEvent(event)
    );
  }

  addEnterEvent() {
    this.targetDom.addEventListener("keydown", (event) => {
      const {
        keyCode,
        target: { value },
      } = event;
      if (keyCode === 13) {
        event.preventDefault();
        this.historyManager.addData2localStorage(value);
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
