class SearchInputEventHandler {
  constructor(router, historyManager) {
    this.router = router;
    this.historyManager = this.historyManager;
  }

  addFocusEvent(dom) {
    dom.addEventListener("focus", () => this.onFocusEvent());
  }

  addInputEvent(dom) {
    dom.addEventListener("input", (event) => this.onInputEvent(event));
  }

  onInputEvent({ target: { value } }) {
    this.router.setAutoCompleteData(value);
  }

  onFocusEvent() {
    this.historyManager.manageHistory();
  }
}
