class Store {
  constructor() {
    this.state = {
      isBarDropBoxVisible: false,
      keyword: "",
      keyupKeyword: [],
      selectedCategory: "전체",
    };
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
  }
}

export default Store;
