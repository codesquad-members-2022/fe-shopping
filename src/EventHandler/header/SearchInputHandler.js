class SearchInputEventHandler {
  constructor(dom, router, historyManager) {
    this.targetDom = dom;
    this.router = router;
    this.historyManager = this.historyManager;
  }

  addFocusEvent() {
    this.targetDom.addEventListener("focus", () => this.onFocusEvent());
  }

  addInputEvent() {
    this.targetDom.addEventListener("input", (event) =>
      this.onInputEvent(event)
    );
  }

  onInputEvent({ target: { value } }) {
    this.router.setAutoCompleteData(value);
  }

  onFocusEvent() {
    this.historyManager.manageHistory();
  }
}
