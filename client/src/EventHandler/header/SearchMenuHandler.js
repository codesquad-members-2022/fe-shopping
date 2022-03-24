class SearchMenuEventHandler {
  constructor(dom, router, etcMovement) {
    this.targetDom = dom;
    this.etcMovement = etcMovement;
    this.router = router;
  }

  init() {
    this.addClickEvent();
    this.addClickOutEvent();
  }

  addClickEvent() {
    this.targetDom.addEventListener("click", () => this.onClickEvent());
  }

  addClickOutEvent() {
    document.addEventListener("click", (event) => this.onClickOutEvent(event));
  }

  onClickEvent() {
    const uri = "search/menu/toggle";
    this.router.getMenuData(uri);
  }

  onClickOutEvent(event) {
    this.etcMovement.removeMenu(event);
  }
}

export { SearchMenuEventHandler };
