class SearchMenuModel {
  constructor(state) {
    this.state = state;
  }

  set currentCategory(clicked) {
    this.state.current = clicked;
  }
}

export { SearchMenuModel };
