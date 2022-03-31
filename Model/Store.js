class Store {
  constructor() {
    this.state = {
      isBarDropBoxVisible: false,
      keyword: "",
      keyupKeyword: [],
      selectedCategory: "전체",
    };
  }

  setState(newState) {
    this.state = newState;
  }
}

export default Store;
