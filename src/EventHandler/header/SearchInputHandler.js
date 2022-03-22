class SearchInputEventHandler {
  constructor(dom, router, historyManager) {
    this.targetDom = dom;
    this.router = router;
    this.historyManager = historyManager;
  }

  init() {
    this.addFocusEvent();
    this.addInputEvent();
    //this.addFoucusOutEvent();
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
    console.log(value);
    const uri = `/search/${value}`; // 추후 util폴더 constants로 추가할 예정
    this.router.setAutoCompleteData(uri);
  }

  onFocusEvent() {
    this.historyManager.manageHistory();
  }
}

export { SearchInputEventHandler };
