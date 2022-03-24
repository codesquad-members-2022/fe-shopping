class Store {
  constructor(model, view) {
    this.model = model;
    this.veiw = view;
    this.prevState = null; // 사용하고 싶지만 고칠게 많아서 주말로 미룹니다.
    this.nextState = null;
  }

  reduceData(data) {
    this.model;
    this.nextState = this.model.getHTML(data);
  }

  renderNextState() {
    this.view.render(this.nextState);
  }
}

export default Store;
