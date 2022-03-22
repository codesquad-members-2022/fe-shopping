class SearchMenuEventHandler {
  constructor(dom) {
    this.targetDom = dom;
    this.router = router;
  }

  addClickEvent() {
    this.targetDom.addEventListener("click", () => this.onClickEvent);
  }

  onClickEvent() {
    this.router.getMenuData();
  }
}
