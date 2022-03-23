class SearchMenuEventHandler {
  constructor(dom, router) {
    this.targetDom = dom;
    this.router = router;
  }

  init() {
    this.addClickEvent();
  }

  addClickEvent() {
    this.targetDom.addEventListener("click", () => this.onClickEvent());
  }

  onClickEvent() {
    const uri = "search/menu/toggle";
    this.router.getMenuData(uri);
  }
}

export { SearchMenuEventHandler };
